const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Social Posts ---

// List posts
router.get('/posts', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/posts`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch posts', details: error.response?.data });
  }
});

// Get single post
router.get('/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/posts/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch post', details: error.response?.data });
  }
});

// Create post
router.post('/posts', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/social-media-posting/posts`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create post', details: error.response?.data });
  }
});

// Update post
router.put('/posts/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/social-media-posting/posts/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update post', details: error.response?.data });
  }
});

// Delete post
router.delete('/posts/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/social-media-posting/posts/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete post', details: error.response?.data });
  }
});

// --- Social Accounts ---

// List accounts
router.get('/accounts', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/accounts`, {
      headers: getHeaders(),
      params: { locationId: locationId() }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch accounts', details: error.response?.data });
  }
});

// Get single account
router.get('/accounts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/accounts/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch account', details: error.response?.data });
  }
});

// Delete account
router.delete('/accounts/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/social-media-posting/accounts/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete account', details: error.response?.data });
  }
});

// --- Social Tags ---

// List tags
router.get('/tags', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/tags`, {
      headers: getHeaders(),
      params: { locationId: locationId() }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch tags', details: error.response?.data });
  }
});

// Get single tag
router.get('/tags/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/tags/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch tag', details: error.response?.data });
  }
});

// --- Social Categories ---

// Create category
router.post('/categories', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/social-media-posting/categories`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create category', details: error.response?.data });
  }
});

// --- Social Statistics ---

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/stats`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch stats', details: error.response?.data });
  }
});

// --- CSV Export/Import ---

// Get CSV export
router.get('/csv/export', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/social-media-posting/csv`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to export CSV', details: error.response?.data });
  }
});

// Import CSV
router.post('/csv/import', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/social-media-posting/csv`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to import CSV', details: error.response?.data });
  }
});

module.exports = router;
