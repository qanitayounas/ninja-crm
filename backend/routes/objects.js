const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Custom Object Schemas ---

// List schemas
router.get('/schemas', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/objects/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch schemas', details: error.response?.data });
  }
});

// Get single schema
router.get('/schemas/:schemaId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/objects/${req.params.schemaId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch schema', details: error.response?.data });
  }
});

// Create schema
router.post('/schemas', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/objects/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create schema', details: error.response?.data });
  }
});

// Update schema
router.put('/schemas/:schemaId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/objects/${req.params.schemaId}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update schema', details: error.response?.data });
  }
});

// Delete schema
router.delete('/schemas/:schemaId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/objects/${req.params.schemaId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete schema', details: error.response?.data });
  }
});

// --- Custom Object Records ---

// List records for a schema
router.get('/schemas/:schemaId/records', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/objects/${req.params.schemaId}/records`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch records', details: error.response?.data });
  }
});

// Get single record
router.get('/schemas/:schemaId/records/:recordId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/objects/${req.params.schemaId}/records/${req.params.recordId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch record', details: error.response?.data });
  }
});

// Create record
router.post('/schemas/:schemaId/records', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/objects/${req.params.schemaId}/records`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create record', details: error.response?.data });
  }
});

// Update record
router.put('/schemas/:schemaId/records/:recordId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/objects/${req.params.schemaId}/records/${req.params.recordId}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update record', details: error.response?.data });
  }
});

// Delete record
router.delete('/schemas/:schemaId/records/:recordId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/objects/${req.params.schemaId}/records/${req.params.recordId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete record', details: error.response?.data });
  }
});

// --- Associations ---

// List associations
router.get('/associations', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/associations/`, {
      headers: getHeaders(req),
      params: { locationId: locationId(req), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch associations', details: error.response?.data });
  }
});

// Get single association
router.get('/associations/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/associations/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch association', details: error.response?.data });
  }
});

// Create association
router.post('/associations', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/associations/`, {
      ...req.body,
      locationId: locationId(req)
    }, { headers: getHeaders(req) });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create association', details: error.response?.data });
  }
});

// Update association
router.put('/associations/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/associations/${req.params.id}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update association', details: error.response?.data });
  }
});

// Delete association
router.delete('/associations/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/associations/${req.params.id}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete association', details: error.response?.data });
  }
});

// --- Association Relations ---

// List relations for association
router.get('/associations/:id/relations', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/associations/${req.params.id}/relations`, {
      headers: getHeaders(req),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch relations', details: error.response?.data });
  }
});

// Create relation
router.post('/associations/:id/relations', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/associations/${req.params.id}/relations`, req.body, {
      headers: getHeaders(req)
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create relation', details: error.response?.data });
  }
});

// Delete relation
router.delete('/associations/:id/relations/:relationId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/associations/${req.params.id}/relations/${req.params.relationId}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete relation', details: error.response?.data });
  }
});

module.exports = router;
