const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// --- Calendars ---

// List calendars
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/`, {
      headers: getHeaders(),
      params: { locationId: locationId() }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch calendars', details: error.response?.data });
  }
});

// Get single calendar
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch calendar', details: error.response?.data });
  }
});

// Create calendar
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/calendars/`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create calendar', details: error.response?.data });
  }
});

// Update calendar
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/calendars/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update calendar', details: error.response?.data });
  }
});

// Delete calendar
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/calendars/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete calendar', details: error.response?.data });
  }
});

// Get free slots
router.get('/:id/free-slots', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/${req.params.id}/free-slots`, {
      headers: getHeaders(),
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch free slots', details: error.response?.data });
  }
});

// --- Calendar Events / Appointments ---

// List events (requires calendarId, userId, or groupId)
router.get('/events', async (req, res) => {
  try {
    // If no specific filter provided, first get all calendars then fetch events for each
    if (!req.query.calendarId && !req.query.userId && !req.query.groupId) {
      const calRes = await axios.get(`${GHL_API_BASE}/calendars/`, {
        headers: getHeaders(),
        params: { locationId: locationId() }
      });
      const calendars = calRes.data.calendars || [];
      if (calendars.length === 0) return res.json({ events: [] });

      const startTime = req.query.startTime || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const endTime = req.query.endTime || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

      const allEvents = [];
      for (const cal of calendars) {
        try {
          const evRes = await axios.get(`${GHL_API_BASE}/calendars/events`, {
            headers: getHeaders(),
            params: { locationId: locationId(), calendarId: cal.id, startTime, endTime }
          });
          allEvents.push(...(evRes.data.events || []));
        } catch (e) { /* skip failed calendar */ }
      }
      return res.json({ events: allEvents });
    }

    const response = await axios.get(`${GHL_API_BASE}/calendars/events`, {
      headers: getHeaders(),
      params: {
        locationId: locationId(),
        startTime: req.query.startTime || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: req.query.endTime || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        ...req.query
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch events', details: error.response?.data });
  }
});

// Get single event
router.get('/events/:eventId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/events/appointments/${req.params.eventId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch event', details: error.response?.data });
  }
});

// Create event / book appointment
router.post('/events', async (req, res) => {
  try {
    const payload = {
      ...req.body,
      locationId: req.body.locationId || locationId()
    };
    // calendarId is required
    if (!payload.calendarId) {
      const calRes = await axios.get(`${GHL_API_BASE}/calendars/`, {
        headers: getHeaders(),
        params: { locationId: locationId() }
      });
      const cals = calRes.data.calendars || [];
      if (cals.length > 0) payload.calendarId = cals[0].id;
    }
    const response = await axios.post(`${GHL_API_BASE}/calendars/events/appointments`, payload, {
      headers: getHeaders()
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create event', details: error.response?.data });
  }
});

// Update event
router.put('/events/:eventId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/calendars/events/appointments/${req.params.eventId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update event', details: error.response?.data });
  }
});

// Delete event
router.delete('/events/:eventId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/calendars/events/appointments/${req.params.eventId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete event', details: error.response?.data });
  }
});

// --- Calendar Groups ---

// List groups
router.get('/groups', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/groups`, {
      headers: getHeaders(),
      params: { locationId: locationId() }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch groups', details: error.response?.data });
  }
});

// Create group
router.post('/groups', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/calendars/groups`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create group', details: error.response?.data });
  }
});

// Update group
router.put('/groups/:groupId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/calendars/groups/${req.params.groupId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update group', details: error.response?.data });
  }
});

// Delete group
router.delete('/groups/:groupId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/calendars/groups/${req.params.groupId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete group', details: error.response?.data });
  }
});

// --- Calendar Resources ---

// List resources
router.get('/resources', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/resources`, {
      headers: getHeaders(),
      params: { locationId: locationId() }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch resources', details: error.response?.data });
  }
});

// Get single resource
router.get('/resources/:resourceId', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/resources/${req.params.resourceId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch resource', details: error.response?.data });
  }
});

// Create resource
router.post('/resources', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/calendars/resources`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create resource', details: error.response?.data });
  }
});

// Update resource
router.put('/resources/:resourceId', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/calendars/resources/${req.params.resourceId}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update resource', details: error.response?.data });
  }
});

// Delete resource
router.delete('/resources/:resourceId', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/calendars/resources/${req.params.resourceId}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete resource', details: error.response?.data });
  }
});

module.exports = router;
