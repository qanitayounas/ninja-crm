const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Email Builder ---

// List emails
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/emails/builder`, {
      headers: getHeaders(),
      params: { locationId: locationId(), limit: 20, offset: 0, ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch emails', details: error.response?.data });
  }
});

// Get single email
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/emails/builder/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch email', details: error.response?.data });
  }
});

// Create email
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/emails/builder`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create email', details: error.response?.data });
  }
});

// Update email
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/emails/builder/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update email', details: error.response?.data });
  }
});

// Delete email
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/emails/builder/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete email', details: error.response?.data });
  }
});

// --- Email Scheduling ---

// List scheduled emails
router.get('/schedule', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/emails/schedule`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch schedules', details: error.response?.data });
  }
});

// Create email schedule
router.post('/schedule', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/emails/schedule`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create schedule', details: error.response?.data });
  }
});

// Update email schedule
router.put('/schedule/:scheduleId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/emails/schedule/${req.params.scheduleId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update schedule', details: error.response?.data });
  }
});

// Delete email schedule
router.delete('/schedule/:scheduleId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/emails/schedule/${req.params.scheduleId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete schedule', details: error.response?.data });
  }
});

module.exports = router;
