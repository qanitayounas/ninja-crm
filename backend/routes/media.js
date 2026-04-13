const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

// List media files
router.get('/', async (req, res) => {
  try {
    // Fetch all types in parallel (GHL stores uploads as 'file' type)
    const types = ['file', 'image', 'video', 'document', 'audio'];
    const results = await Promise.allSettled(
      types.map(type =>
        axios.get(`${GHL_API_BASE}/medias/files`, {
          headers: getHeaders(req),
          params: { locationId: locationId(req), type, sortBy: 'createdAt', sortOrder: 'desc', ...req.query }
        })
      )
    );

    const allFiles = [];
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        (r.value.data.files || []).forEach(f => {
          f._mediaType = types[i];
          allFiles.push(f);
        });
      }
    });

    // Sort by createdAt descending
    allFiles.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ files: allFiles, count: allFiles.length });
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch media', details: error.response?.data });
  }
});

// Upload file to GHL
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    form.append('hosted', 'false');
    if (req.body.name) form.append('name', req.body.name);

    const response = await axios.post(
      `${GHL_API_BASE}/medias/upload-file`,
      form,
      {
        headers: {
          ...getHeaders(req),
          ...form.getHeaders(),
          'locationid': locationId(req)
        },
        maxContentLength: 25 * 1024 * 1024,
        maxBodyLength: 25 * 1024 * 1024
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to upload media', details: error.response?.data });
  }
});

// Get single media file
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/medias/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch media file', details: error.response?.data });
  }
});

// Delete media file
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/medias/${req.params.id}`, {
      headers: getHeaders(req),
      params: { altId: locationId(req), altType: 'location' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete media', details: error.response?.data });
  }
});

module.exports = router;
