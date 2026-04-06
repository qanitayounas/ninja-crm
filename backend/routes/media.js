const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// List media files
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/medias/files`, {
      headers: getHeaders(),
      params: { locationId: locationId(), type: req.query.type || 'image', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch media', details: error.response?.data });
  }
});

// Get single media file
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/medias/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch media file', details: error.response?.data });
  }
});

// Upload media file
router.post('/upload', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/medias/upload`, req.body, {
      headers: {
        ...getHeaders(),
        'Content-Type': req.headers['content-type'] || 'application/json'
      }
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to upload media', details: error.response?.data });
  }
});

// Delete media file
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/medias/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete media', details: error.response?.data });
  }
});

module.exports = router;
