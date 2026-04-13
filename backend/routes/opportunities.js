const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Pipelines ---

// List pipelines
router.get('/pipelines', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/pipelines`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch pipelines', details: error.response?.data });
  }
});

// Get single pipeline
router.get('/pipelines/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/pipelines/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch pipeline', details: error.response?.data });
  }
});

// Create pipeline
router.post('/pipelines', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/opportunities/pipelines`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create pipeline', details: error.response?.data });
  }
});

// Update pipeline
router.put('/pipelines/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/opportunities/pipelines/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update pipeline', details: error.response?.data });
  }
});

// Delete pipeline
router.delete('/pipelines/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/opportunities/pipelines/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete pipeline', details: error.response?.data });
  }
});

// --- Opportunities ---

// Search opportunities
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/search`, {
      headers: getHeaders(req),
      params: { location_id: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch opportunities', details: error.response?.data });
  }
});

// Get single opportunity
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch opportunity', details: error.response?.data });
  }
});

// Create opportunity
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/opportunities/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create opportunity', details: error.response?.data });
  }
});

// Update opportunity
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/opportunities/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update opportunity', details: error.response?.data });
  }
});

// Delete opportunity
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/opportunities/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete opportunity', details: error.response?.data });
  }
});

// Update opportunity status
router.put('/:id/status', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/opportunities/${req.params.id}/status`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update status', details: error.response?.data });
  }
});

// Upsert opportunity
router.post('/upsert', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/opportunities/upsert`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to upsert opportunity', details: error.response?.data });
  }
});

module.exports = router;
