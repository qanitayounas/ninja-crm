const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Documents & Contracts ---

// List documents
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/documents-contracts/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch documents', details: error.response?.data });
  }
});

// Get single document
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/documents-contracts/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch document', details: error.response?.data });
  }
});

// Send document link
router.post('/:id/send', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/documents-contracts/${req.params.id}/send`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to send document', details: error.response?.data });
  }
});

// --- Document Templates ---

// List templates
router.get('/templates', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/documents-contracts/templates`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch templates', details: error.response?.data });
  }
});

// Get single template
router.get('/templates/:templateId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/documents-contracts/templates/${req.params.templateId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch template', details: error.response?.data });
  }
});

// Send template link
router.post('/templates/:templateId/send', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/documents-contracts/templates/${req.params.templateId}/send`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to send template', details: error.response?.data });
  }
});

module.exports = router;
