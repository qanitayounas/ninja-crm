const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// List businesses
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/businesses/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch businesses', details: error.response?.data });
  }
});

// Get single business
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/businesses/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch business', details: error.response?.data });
  }
});

// Create business
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/businesses/`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create business', details: error.response?.data });
  }
});

// Update business
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/businesses/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update business', details: error.response?.data });
  }
});

// Delete business
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/businesses/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete business', details: error.response?.data });
  }
});

module.exports = router;
