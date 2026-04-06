const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Product Collections (MUST be before /:id routes) ---

// List collections
router.get('/collections', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/products/collections`, {
      headers: getHeaders(),
      params: { locationId: locationId(), altId: locationId(), altType: 'location', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch collections', details: error.response?.data });
  }
});

// Get single collection
router.get('/collections/:collectionId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/products/collections/${req.params.collectionId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch collection', details: error.response?.data });
  }
});

// Create collection
router.post('/collections', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/products/collections`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create collection', details: error.response?.data });
  }
});

// Update collection
router.put('/collections/:collectionId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/products/collections/${req.params.collectionId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update collection', details: error.response?.data });
  }
});

// Delete collection
router.delete('/collections/:collectionId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/products/collections/${req.params.collectionId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete collection', details: error.response?.data });
  }
});

// --- Products ---

// List products
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/products/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch products', details: error.response?.data });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/products/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch product', details: error.response?.data });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/products/`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create product', details: error.response?.data });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/products/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update product', details: error.response?.data });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/products/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete product', details: error.response?.data });
  }
});

// --- Product Prices ---

// List prices for a product
router.get('/:id/prices', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/products/${req.params.id}/prices`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch prices', details: error.response?.data });
  }
});

// Get single price
router.get('/:id/prices/:priceId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/products/${req.params.id}/prices/${req.params.priceId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch price', details: error.response?.data });
  }
});

// Create price
router.post('/:id/prices', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/products/${req.params.id}/prices`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create price', details: error.response?.data });
  }
});

// Update price
router.put('/:id/prices/:priceId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/products/${req.params.id}/prices/${req.params.priceId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update price', details: error.response?.data });
  }
});

// Delete price
router.delete('/:id/prices/:priceId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/products/${req.params.id}/prices/${req.params.priceId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete price', details: error.response?.data });
  }
});

module.exports = router;
