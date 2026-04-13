const jwt = require('jsonwebtoken');
const axios = require('axios');
const { findByLocationId, upsertClient } = require('../lib/clientStore');

const GHL_TOKEN_URL = 'https://services.leadconnectorhq.com/oauth/token';

// Auto-refresh token if it expires within 5 minutes
const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000;

async function refreshTokenIfNeeded(client) {
  const expiresAt = new Date(client.expiresAt).getTime();
  const now = Date.now();

  if (expiresAt - now > TOKEN_REFRESH_BUFFER_MS) {
    return client; // Token still valid
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
    const newExpiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    const updated = {
      ...client,
      accessToken: access_token,
      refreshToken: refresh_token || client.refreshToken,
      expiresAt: newExpiresAt
    };

    upsertClient(updated);
    console.log(`Token auto-refreshed for location: ${client.locationId}`);
    return updated;
  } catch (error) {
    console.error(`Token refresh failed for ${client.locationId}:`, error.message);
    return client; // Return existing, let the API call fail naturally
  }
}

// Middleware: verifies JWT, resolves client, attaches GHL token to request
async function clientAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let client = findByLocationId(decoded.locationId);
    if (!client) {
      return res.status(401).json({ error: 'Client not found. Please reconnect your account.' });
    }

    // Auto-refresh token if needed
    client = await refreshTokenIfNeeded(client);

    // Attach client info to request for use in route handlers
    req.ghlClient = {
      locationId: client.locationId,
      accessToken: client.accessToken,
      userId: client.userId,
      userType: client.userType,
      locationName: client.locationName
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
}

module.exports = clientAuth;
