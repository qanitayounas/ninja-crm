const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Funnels ---

// List funnels
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/funnel/list`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch funnels', details: error.response?.data });
  }
});

// Get single funnel
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/funnel/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch funnel', details: error.response?.data });
  }
});

// --- Funnel Pages ---

// List pages for funnel
router.get('/:id/pages', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/page`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), funnelId: req.params.id, ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch pages', details: error.response?.data });
  }
});

// Get page count for funnel
router.get('/:id/page-count', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/page/count`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), funnelId: req.params.id }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch page count', details: error.response?.data });
  }
});

// --- Funnel Redirects ---

// List redirects
router.get('/redirects', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/lookup/redirect/list`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch redirects', details: error.response?.data });
  }
});

// Create redirect
router.post('/redirects', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/funnels/lookup/redirect`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create redirect', details: error.response?.data });
  }
});

// Update redirect
router.put('/redirects/:redirectId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/funnels/lookup/redirect/${req.params.redirectId}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update redirect', details: error.response?.data });
  }
});

// Delete redirect
router.delete('/redirects/:redirectId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/funnels/lookup/redirect/${req.params.redirectId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete redirect', details: error.response?.data });
  }
});

module.exports = router;
