const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GHL_API_BASE, getHeaders, locationId } = require('./_helpers');

// List courses
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/courses/`, {
      headers: getHeaders(),
      params: { locationId: locationId(), ...req.query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch courses', details: error.response?.data });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/courses/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch course', details: error.response?.data });
  }
});

// Create course
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/courses/`, {
      ...req.body,
      locationId: locationId()
    }, { headers: getHeaders() });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to create course', details: error.response?.data });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${GHL_API_BASE}/courses/${req.params.id}`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to update course', details: error.response?.data });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${GHL_API_BASE}/courses/${req.params.id}`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to delete course', details: error.response?.data });
  }
});

// --- Course Content ---

// List modules/lessons in course
router.get('/:id/modules', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/courses/${req.params.id}/modules`, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch modules', details: error.response?.data });
  }
});

// --- Course Enrollments ---

// Import students
router.post('/:id/import', async (req, res) => {
  try {
    const response = await axios.post(`${GHL_API_BASE}/courses/${req.params.id}/import`, req.body, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to import students', details: error.response?.data });
  }
});

module.exports = router;
