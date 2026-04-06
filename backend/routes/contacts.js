const express = require('express');
const router = express.Router();
const { proxyGet, proxyGetById, proxyPost, proxyPut, proxyDelete, locationId } = require('./_helpers');

// List contacts
router.get('/', proxyGet('/contacts/', (req) => ({
  locationId: locationId(),
  ...req.query
})));

// Search contacts
router.get('/search', proxyGet('/contacts/search', (req) => ({
  locationId: locationId(),
  ...req.query
})));

// Get single contact
router.get('/:id', proxyGetById((p) => `/contacts/${p.id}`));

// Create contact
router.post('/', proxyPost('/contacts/', (req) => ({
  ...req.body,
  locationId: locationId()
})));

// Update contact
router.put('/:id', proxyPut((p) => `/contacts/${p.id}`));

// Delete contact
router.delete('/:id', proxyDelete((p) => `/contacts/${p.id}`));

// Upsert contact
router.post('/upsert', proxyPost('/contacts/upsert', (req) => ({
  ...req.body,
  locationId: locationId()
})));

// --- Contact Tags ---
router.post('/:id/tags', proxyPost(null, (req) => req.body));
// Add tag to contact (uses dynamic path)
const { GHL_API_BASE, getHeaders } = require('./_helpers');
const axios = require('axios');

router.post('/:id/tags', async (req, res) => {
  try {
    const response = await axios.post(
      `${GHL_API_BASE}/contacts/${req.params.id}/tags`,
      req.body,
      { headers: getHeaders() }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to add tag', details: error.response?.data });
  }
});

// Remove tag from contact
router.delete('/:id/tags', async (req, res) => {
  try {
    const response = await axios.delete(
      `${GHL_API_BASE}/contacts/${req.params.id}/tags`,
      { headers: getHeaders(), data: req.body }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to remove tag', details: error.response?.data });
  }
});

// --- Contact Notes ---
router.get('/:id/notes', proxyGetById((p) => `/contacts/${p.id}/notes`));
router.post('/:id/notes', async (req, res) => {
  try {
    const response = await axios.post(
      `${GHL_API_BASE}/contacts/${req.params.id}/notes`,
      { ...req.body, locationId: locationId() },
      { headers: getHeaders() }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create note', details: error.response?.data });
  }
});
router.put('/:id/notes/:noteId', proxyPut((p) => `/contacts/${p.id}/notes/${p.noteId}`));
router.delete('/:id/notes/:noteId', proxyDelete((p) => `/contacts/${p.id}/notes/${p.noteId}`));

// --- Contact Tasks ---
router.get('/:id/tasks', proxyGetById((p) => `/contacts/${p.id}/tasks`));
router.post('/:id/tasks', async (req, res) => {
  try {
    const response = await axios.post(
      `${GHL_API_BASE}/contacts/${req.params.id}/tasks`,
      { ...req.body, locationId: locationId() },
      { headers: getHeaders() }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create task', details: error.response?.data });
  }
});
router.put('/:id/tasks/:taskId', proxyPut((p) => `/contacts/${p.id}/tasks/${p.taskId}`));
router.delete('/:id/tasks/:taskId', proxyDelete((p) => `/contacts/${p.id}/tasks/${p.taskId}`));

// --- Contact Appointments ---
router.get('/:id/appointments', proxyGetById((p) => `/contacts/${p.id}/appointments`));

// --- Contact Campaigns ---
router.post('/:id/campaigns/add', async (req, res) => {
  try {
    const response = await axios.post(
      `${GHL_API_BASE}/contacts/${req.params.id}/campaigns/add`,
      req.body,
      { headers: getHeaders() }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to add to campaign', details: error.response?.data });
  }
});

router.post('/:id/campaigns/remove', async (req, res) => {
  try {
    const response = await axios.post(
      `${GHL_API_BASE}/contacts/${req.params.id}/campaigns/remove`,
      req.body,
      { headers: getHeaders() }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to remove from campaign', details: error.response?.data });
  }
});

// --- Contact Workflows ---
router.post('/:id/workflow/:workflowId', async (req, res) => {
  try {
    const response = await axios.post(
      `${GHL_API_BASE}/contacts/${req.params.id}/workflow/${req.params.workflowId}`,
      { eventStartTime: req.body.eventStartTime },
      { headers: getHeaders() }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to add to workflow', details: error.response?.data });
  }
});

router.delete('/:id/workflow/:workflowId', proxyDelete((p) => `/contacts/${p.id}/workflow/${p.workflowId}`));

module.exports = router;
