const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// Search conversations
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/conversations/search`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch conversations', details: error.response?.data });
  }
});

// Get single conversation
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/conversations/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch conversation', details: error.response?.data });
  }
});

// Create conversation
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/conversations/`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create conversation', details: error.response?.data });
  }
});

// Update conversation
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/conversations/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update conversation', details: error.response?.data });
  }
});

// Delete conversation
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/conversations/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete conversation', details: error.response?.data });
  }
});

// Get messages in conversation
router.get('/:id/messages', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/conversations/${req.params.id}/messages`, {
      headers: getHeaders(),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch messages', details: error.response?.data });
  }
});

// Send message
router.post('/messages', async (req, res) => {
  try {
    const payload = { ...req.body, locationId: locationId() };
    const response = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to send message', details: error.response?.data });
  }
});

// Get message by ID
router.get('/messages/:messageId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/conversations/messages/${req.params.messageId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch message', details: error.response?.data });
  }
});

// Cancel scheduled message
router.delete('/messages/:messageId/schedule', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/conversations/messages/${req.params.messageId}/schedule`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to cancel schedule', details: error.response?.data });
  }
});

// Upload message attachment
router.post('/messages/upload', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/conversations/messages/upload`, req.body, {
      headers: { ...getHeaders(), 'Content-Type': req.headers['content-type'] }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to upload attachment', details: error.response?.data });
  }
});

// Update message status
router.put('/messages/:messageId/status', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/conversations/messages/${req.params.messageId}/status`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update status', details: error.response?.data });
  }
});

module.exports = router;
