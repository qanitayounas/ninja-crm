const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Orders ---

// List orders
router.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/orders`, {
      headers: getHeaders(),
      params: { altId: locationId(), altType: 'location', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch orders', details: error.response?.data });
  }
});

// Get single order
router.get('/orders/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/orders/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch order', details: error.response?.data });
  }
});

// Create order
router.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/payments/orders`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create order', details: error.response?.data });
  }
});

// Collect payment for order
router.post('/orders/:id/collect', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/payments/orders/${req.params.id}/collect`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to collect payment', details: error.response?.data });
  }
});

// --- Transactions ---

// List transactions
router.get('/transactions', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/transactions`, {
      headers: getHeaders(),
      params: { altId: locationId(), altType: 'location', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch transactions', details: error.response?.data });
  }
});

// Get single transaction
router.get('/transactions/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/transactions/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch transaction', details: error.response?.data });
  }
});

// --- Subscriptions ---

// List subscriptions
router.get('/subscriptions', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/subscriptions`, {
      headers: getHeaders(),
      params: { altId: locationId(), altType: 'location', ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch subscriptions', details: error.response?.data });
  }
});

// Get single subscription
router.get('/subscriptions/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/subscriptions/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch subscription', details: error.response?.data });
  }
});

// --- Payment Integrations ---

// List integrations
router.get('/integrations', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/integrations/provider/whitelabel`, {
      headers: getHeaders(),
      params: { altId: locationId(), altType: 'location' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch integrations', details: error.response?.data });
  }
});

// Create integration
router.post('/integrations', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/payments/integrations`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create integration', details: error.response?.data });
  }
});

// --- Coupons ---

// List coupons
router.get('/coupons', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/coupons`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch coupons', details: error.response?.data });
  }
});

// Get single coupon
router.get('/coupons/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/coupons/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch coupon', details: error.response?.data });
  }
});

// Create coupon
router.post('/coupons', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/payments/coupons`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create coupon', details: error.response?.data });
  }
});

// Update coupon
router.put('/coupons/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/payments/coupons/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update coupon', details: error.response?.data });
  }
});

// Delete coupon
router.delete('/coupons/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/payments/coupons/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete coupon', details: error.response?.data });
  }
});

// --- Custom Payment Providers ---

// List custom providers
router.get('/custom-providers', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/custom-provider/provider`, {
      headers: getHeaders(),
      params: { locationId: locationId() }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch custom providers', details: error.response?.data });
  }
});

// Create custom provider
router.post('/custom-providers', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/payments/custom-provider/provider`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create custom provider', details: error.response?.data });
  }
});

// Delete custom provider
router.delete('/custom-providers/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/payments/custom-provider/provider/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete custom provider', details: error.response?.data });
  }
});

module.exports = router;
