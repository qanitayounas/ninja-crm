const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// ========================
// CHARGES
// ========================

// List charges
router.get('/charges', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/charges/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch charges', details: error.response?.data });
  }
});

// Get single charge
router.get('/charges/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/charges/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch charge', details: error.response?.data });
  }
});

// Create charge
router.post('/charges', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/charges/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create charge', details: error.response?.data });
  }
});

// ========================
// RECURRING TASKS
// ========================

// List recurring tasks
router.get('/recurring-tasks', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/recurring-tasks/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch recurring tasks', details: error.response?.data });
  }
});

// Get single recurring task
router.get('/recurring-tasks/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/recurring-tasks/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch recurring task', details: error.response?.data });
  }
});

// Create recurring task
router.post('/recurring-tasks', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/recurring-tasks/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create recurring task', details: error.response?.data });
  }
});

// Update recurring task
router.put('/recurring-tasks/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/recurring-tasks/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update recurring task', details: error.response?.data });
  }
});

// Delete recurring task
router.delete('/recurring-tasks/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/recurring-tasks/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete recurring task', details: error.response?.data });
  }
});

// ========================
// LINKS
// ========================

// List links
router.get('/links', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/links/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch links', details: error.response?.data });
  }
});

// Get single link
router.get('/links/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/links/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch link', details: error.response?.data });
  }
});

// Create link
router.post('/links', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/links/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create link', details: error.response?.data });
  }
});

// Update link
router.put('/links/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/links/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update link', details: error.response?.data });
  }
});

// Delete link
router.delete('/links/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/links/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete link', details: error.response?.data });
  }
});

// ========================
// SaaS / SUBACCOUNTS
// ========================

// Get SaaS location info
router.get('/saas/location', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/saas-api/public-api/locations/${locationId(req)}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch SaaS location', details: error.response?.data });
  }
});

// Update SaaS location
router.put('/saas/location', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/saas-api/public-api/locations/${locationId(req)}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update SaaS location', details: error.response?.data });
  }
});

// ========================
// REVIEWS (undocumented but working)
// ========================

// List reviews
router.get('/reviews', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/reviews/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch reviews', details: error.response?.data });
  }
});

module.exports = router;
