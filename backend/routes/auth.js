const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { upsertClient, findByLocationId, findByEmail, removeClient } = require('../lib/clientStore');

const router = express.Router();

const GHL_AUTH_BASE = process.env.GHL_AUTH_URL || 'https://marketplace.leadconnectorhq.com/oauth/chooselocation';
const GHL_TOKEN_URL = 'https://services.leadconnectorhq.com/oauth/token';
const GHL_API_BASE = 'https://services.leadconnectorhq.com';

// ========================
// GET /api/auth/ghl/authorize
// Redirects the user to GHL OAuth consent screen
// ========================
router.get('/ghl/authorize', (req, res) => {
  const appId = process.env.GHL_APP_ID || process.env.GHL_CLIENT_ID.split('-')[0];
  const versionId = process.env.GHL_VERSION_ID || appId;
  const locationId = req.query.locationId;

  if (!locationId) {
    return res.status(400).json({ error: 'locationId is required', needsLocationId: true });
  }

  // Sub-account install link with correct version ID - gives Location-level tokens
  const authUrl = `https://app.gohighlevel.com/v2/location/${locationId}/integration/${appId}/versions/${versionId}`;

  res.json({ authUrl });
});

// ========================
// GET /api/auth/ghl/callback AND /api/auth/callback
// Handles OAuth callback, exchanges code for tokens
// ========================
router.get('/ghl/callback', handleCallback);
router.get('/callback', handleCallback);

async function handleCallback(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    // Exchange code for tokens
    const params = new URLSearchParams();
    params.append('client_id', process.env.GHL_CLIENT_ID);
    params.append('client_secret', process.env.GHL_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.GHL_REDIRECT_URI);

    const tokenResponse = await axios.post(GHL_TOKEN_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const {
      access_token,
      refresh_token,
      expires_in,
      locationId: rawLocationId,
      companyId,
      userId,
      userType
    } = tokenResponse.data;

    console.log('OAuth token response:', { rawLocationId, companyId, userId, userType });

    // Use locationId if available, otherwise use env location ID (not companyId)
    const locationId = rawLocationId || process.env.GHL_LOCATION_ID;
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    // Fetch user details for email
    let userEmail = '';
    let userName = '';
    try {
      const userRes = await axios.get(`${GHL_API_BASE}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Version': '2021-07-28'
        }
      });
      userEmail = userRes.data.email || '';
      userName = userRes.data.name || userRes.data.firstName || '';
      console.log('User details:', { userEmail, userName });
    } catch (e) {
      console.log('User details not accessible:', e.message);
    }

    // Fetch location details for display name
    let locationName = userName || locationId;
    let locationEmail = userEmail;
    try {
      const locRes = await axios.get(`${GHL_API_BASE}/locations/${locationId}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Version': '2021-07-28'
        }
      });
      locationName = locRes.data.location?.name || locRes.data.name || locationName;
      locationEmail = locRes.data.location?.email || locRes.data.email || locationEmail;
    } catch (e) {
      console.log('Location details not accessible, using user details');
    }

    // Store client tokens
    upsertClient({
      locationId,
      companyId,
      userId,
      userType,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt,
      locationName,
      locationEmail
    });

    // Create JWT session token for the frontend
    const sessionToken = jwt.sign(
      { locationId, userId, locationName, locationEmail },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to frontend with session token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${sessionToken}&name=${encodeURIComponent(locationName)}`);
  } catch (error) {
    console.error('OAuth token exchange error:', error.response?.data || error.message);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
}

// ========================
// POST /api/auth/ghl/refresh
// Refreshes an expired access token
// ========================
router.post('/ghl/refresh', async (req, res) => {
  const { locationId } = req.body;

  const client = findByLocationId(locationId);
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.GHL_CLIENT_ID);
    params.append('client_secret', process.env.GHL_CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', client.refreshToken);

    const tokenResponse = await axios.post(GHL_TOKEN_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    upsertClient({
      ...client,
      accessToken: access_token,
      refreshToken: refresh_token || client.refreshToken,
      expiresAt
    });

    res.json({ success: true, expiresAt });
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// ========================
// GET /api/auth/me
// Returns current session info
// ========================
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = findByLocationId(decoded.locationId);

    if (!client) {
      return res.status(401).json({ error: 'Client not found' });
    }

    res.json({
      locationId: decoded.locationId,
      userId: decoded.userId,
      locationName: client.locationName,
      locationEmail: client.locationEmail,
      connected: true
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// ========================
// POST /api/auth/reconnect
// Quick login for clients who already installed - no OAuth needed
// ========================
router.post('/reconnect', (req, res) => {
  const { locationId, email } = req.body;

  if (!locationId && !email) {
    return res.status(400).json({ error: 'locationId or email is required' });
  }

  // Try finding by locationId first, then by email
  const client = locationId ? findByLocationId(locationId) : findByEmail(email);
  if (!client) {
    return res.status(404).json({ error: 'not_found', message: 'No account found. Please connect with GoHighLevel first.' });
  }

  // Create new JWT session token
  const sessionToken = jwt.sign(
    { locationId: client.locationId, userId: client.userId, locationName: client.locationName, locationEmail: client.locationEmail },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token: sessionToken, name: client.locationName });
});

// ========================
// POST /api/auth/logout
// ========================
router.post('/logout', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
