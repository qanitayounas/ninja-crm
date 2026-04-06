const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Campaigns ---

// List campaigns
router.get('/campaigns', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/campaigns/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch campaigns', details: error.response?.data });
  }
});

// Get single campaign
router.get('/campaigns/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/campaigns/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch campaign', details: error.response?.data });
  }
});

// --- Workflows ---

// List workflows
router.get('/workflows', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/workflows/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch workflows', details: error.response?.data });
  }
});

// Get single workflow
router.get('/workflows/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/workflows/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch workflow', details: error.response?.data });
  }
});

// --- Forms ---

// List forms
router.get('/forms', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/forms/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch forms', details: error.response?.data });
  }
});

// Get form submissions
router.get('/forms/:id/submissions', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/forms/submissions`, {
      headers: getHeaders(),
      params: { locationId: locationId(), formId: req.params.id, ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch submissions', details: error.response?.data });
  }
});

// Upload form custom file
router.post('/forms/upload-custom-files', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/forms/upload-custom-files`, req.body, {
      headers: { ...getHeaders(), 'Content-Type': req.headers['content-type'] || 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to upload files', details: error.response?.data });
  }
});

// --- Surveys ---

// List surveys
router.get('/surveys', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/surveys/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch surveys', details: error.response?.data });
  }
});

// Get survey submissions
router.get('/surveys/:id/submissions', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/surveys/submissions`, {
      headers: getHeaders(),
      params: { locationId: locationId(), surveyId: req.params.id, ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch survey submissions', details: error.response?.data });
  }
});

module.exports = router;
