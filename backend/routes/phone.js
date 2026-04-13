const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Phone Numbers ---

// List phone numbers
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/phone-numbers/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch phone numbers', details: error.response?.data });
  }
});

// Get single phone number
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/phone-numbers/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch phone number', details: error.response?.data });
  }
});

// Create / purchase phone number
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/phone-numbers/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create phone number', details: error.response?.data });
  }
});

// Update phone number
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/phone-numbers/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update phone number', details: error.response?.data });
  }
});

// Delete / release phone number
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/phone-numbers/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete phone number', details: error.response?.data });
  }
});

// --- Number Pools ---

// List number pools
router.get('/pools', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/phone-numbers/number-pools`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch number pools', details: error.response?.data });
  }
});

// --- Twilio Account ---

// Get Twilio account info
router.get('/twilio', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/phone-numbers/twilio`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch Twilio info', details: error.response?.data });
  }
});

module.exports = router;
