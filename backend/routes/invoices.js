const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Invoice Schedules (MUST be before /:id) ---

// List schedules
router.get('/schedule', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/schedule`, {
      headers: getHeaders(),
      params: { altId: locationId(), altType: 'location', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch schedules', details: error.response?.data });
  }
});

router.get('/schedule/:scheduleId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/schedule/${req.params.scheduleId}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch schedule', details: error.response?.data });
  }
});

router.post('/schedule', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/schedule`, { ...req.body, locationId: locationId() }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create schedule', details: error.response?.data });
  }
});

router.put('/schedule/:scheduleId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/invoices/schedule/${req.params.scheduleId}`, req.body, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update schedule', details: error.response?.data });
  }
});

router.delete('/schedule/:scheduleId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/invoices/schedule/${req.params.scheduleId}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete schedule', details: error.response?.data });
  }
});

// --- Invoice Templates (MUST be before /:id) ---

router.get('/template', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/template`, { headers: getHeaders(), params: { altId: locationId(), altType: 'location', ...req.query } });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch templates', details: error.response?.data });
  }
});

router.get('/template/:templateId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/template/${req.params.templateId}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch template', details: error.response?.data });
  }
});

router.post('/template', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/template`, { ...req.body, locationId: locationId() }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create template', details: error.response?.data });
  }
});

router.put('/template/:templateId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/invoices/template/${req.params.templateId}`, req.body, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update template', details: error.response?.data });
  }
});

router.delete('/template/:templateId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/invoices/template/${req.params.templateId}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete template', details: error.response?.data });
  }
});

// --- Estimates (MUST be before /:id) ---

router.get('/estimate', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/estimate`, { headers: getHeaders(), params: { altId: locationId(), altType: 'location', ...req.query } });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch estimates', details: error.response?.data });
  }
});

router.get('/estimate/:estimateId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/estimate/${req.params.estimateId}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch estimate', details: error.response?.data });
  }
});

router.post('/estimate', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/estimate`, { ...req.body, locationId: locationId() }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create estimate', details: error.response?.data });
  }
});

router.put('/estimate/:estimateId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/invoices/estimate/${req.params.estimateId}`, req.body, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update estimate', details: error.response?.data });
  }
});

router.delete('/estimate/:estimateId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/invoices/estimate/${req.params.estimateId}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete estimate', details: error.response?.data });
  }
});

// --- Invoices CRUD ---

// List invoices
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/`, {
      headers: getHeaders(),
      params: { altId: locationId(), altType: 'location', limit: '20', offset: '0', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch invoices', details: error.response?.data });
  }
});

// Get single invoice
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/invoices/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch invoice', details: error.response?.data });
  }
});

// Create invoice
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create invoice', details: error.response?.data });
  }
});

// Update invoice
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/invoices/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update invoice', details: error.response?.data });
  }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/invoices/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete invoice', details: error.response?.data });
  }
});

// Void invoice
router.post('/:id/void', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/${req.params.id}/void`, {}, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to void invoice', details: error.response?.data });
  }
});

// Send invoice
router.post('/:id/send', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/${req.params.id}/send`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to send invoice', details: error.response?.data });
  }
});

// Record payment
router.post('/:id/record-payment', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/invoices/${req.params.id}/record-payment`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to record payment', details: error.response?.data });
  }
});

module.exports = router;
