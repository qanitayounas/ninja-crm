const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Blog Sites ---

// List blogs
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/blogs/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch blogs', details: error.response?.data });
  }
});

// --- Blog Posts ---

// List posts for a blog
router.get('/:blogId/posts', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/blogs/${req.params.blogId}/posts`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch posts', details: error.response?.data });
  }
});

// Get single post
router.get('/:blogId/posts/:postId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/blogs/${req.params.blogId}/posts/${req.params.postId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch post', details: error.response?.data });
  }
});

// Create post
router.post('/:blogId/posts', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/blogs/${req.params.blogId}/posts`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create post', details: error.response?.data });
  }
});

// Update post
router.put('/:blogId/posts/:postId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/blogs/${req.params.blogId}/posts/${req.params.postId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update post', details: error.response?.data });
  }
});

// Delete post
router.delete('/:blogId/posts/:postId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/blogs/${req.params.blogId}/posts/${req.params.postId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete post', details: error.response?.data });
  }
});

// --- Blog Categories ---

// List categories
router.get('/:blogId/categories', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/blogs/categories`, {
      headers: getHeaders(),
      params: { locationId: locationId(), limit: 50, offset: 0, ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch categories', details: error.response?.data });
  }
});

// --- Blog Authors ---

// List authors
router.get('/:blogId/authors', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/blogs/authors`, {
      headers: getHeaders(),
      params: { locationId: locationId(), limit: 50, offset: 0, ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch authors', details: error.response?.data });
  }
});

// --- Slug Check ---

// Check slug availability
router.get('/:blogId/check-slug', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/blogs/${req.params.blogId}/check-slug`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to check slug', details: error.response?.data });
  }
});

module.exports = router;
