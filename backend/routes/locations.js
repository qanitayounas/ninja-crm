const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Location ---

// Get current location
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch location', details: error.response?.data });
  }
});

// Update location
router.put('/', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/locations/${locationId(req)}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update location', details: error.response?.data });
  }
});

// --- Custom Fields ---

// List custom fields
router.get('/custom-fields', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/customFields`, {
      headers: getHeaders(req),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch custom fields', details: error.response?.data });
  }
});

// Get single custom field
router.get('/custom-fields/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/customFields/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch custom field', details: error.response?.data });
  }
});

// Create custom field
router.post('/custom-fields', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/locations/${locationId(req)}/customFields`, req.body, {
      headers: getHeaders(req)
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create custom field', details: error.response?.data });
  }
});

// Update custom field
router.put('/custom-fields/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/locations/${locationId(req)}/customFields/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update custom field', details: error.response?.data });
  }
});

// Delete custom field
router.delete('/custom-fields/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/locations/${locationId(req)}/customFields/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete custom field', details: error.response?.data });
  }
});

// --- Custom Values ---

// List custom values
router.get('/custom-values', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/customValues`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch custom values', details: error.response?.data });
  }
});

// Create custom value
router.post('/custom-values', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/locations/${locationId(req)}/customValues`, req.body, {
      headers: getHeaders(req)
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create custom value', details: error.response?.data });
  }
});

// Update custom value
router.put('/custom-values/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/locations/${locationId(req)}/customValues/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update custom value', details: error.response?.data });
  }
});

// Delete custom value
router.delete('/custom-values/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/locations/${locationId(req)}/customValues/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete custom value', details: error.response?.data });
  }
});

// --- Tags ---

// List tags
router.get('/tags', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/tags`, {
      headers: getHeaders(req),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch tags', details: error.response?.data });
  }
});

// Get single tag
router.get('/tags/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/tags/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch tag', details: error.response?.data });
  }
});

// Create tag
router.post('/tags', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/locations/${locationId(req)}/tags`, req.body, {
      headers: getHeaders(req)
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create tag', details: error.response?.data });
  }
});

// Update tag
router.put('/tags/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/locations/${locationId(req)}/tags/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update tag', details: error.response?.data });
  }
});

// Delete tag
router.delete('/tags/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/locations/${locationId(req)}/tags/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete tag', details: error.response?.data });
  }
});

// --- Templates ---

// List templates (email/SMS)
router.get('/templates', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/templates`, {
      headers: getHeaders(req),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch templates', details: error.response?.data });
  }
});

// --- Tasks ---

// List location tasks
router.get('/tasks', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/locations/${locationId(req)}/tasks`, {
      headers: getHeaders(req),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch tasks', details: error.response?.data });
  }
});

module.exports = router;
