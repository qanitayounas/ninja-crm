const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// GoHighLevel API Configuration
const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Version': '2021-07-28'
});

// Helper functions for Tasks DB
const readTasks = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading tasks file:', err);
    return [];
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing tasks file:', err);
    return false;
  }
};

// --- API Endpoints ---

// Check Status
app.get('/api/status', (req, res) => {
  res.json({ status: 'Online', message: 'Ninja CRM Backend Proxy is running.' });
});

// Fetch Contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/contacts/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching contacts:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch contacts from HighLevel',
      details: error.response?.data
    });
  }
});

// Fetch Pipelines
app.get('/api/pipelines', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/pipelines`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching pipelines:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch pipelines',
      details: error.response?.data
    });
  }
});

// Fetch Opportunities (Deals)
app.get('/api/opportunities', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/search`, {
      headers: getHeaders(),
      params: { location_id: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Opportunities Proxy Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch opportunities',
      details: error.response?.data || error.message 
    });
  }
});

// --- Local Task Endpoints ---

// Fetch All Tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json({ tasks });
});

// Create Task
app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: `t-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...req.body
  };
  tasks.push(newTask);
  if (writeTasks(tasks)) {
    res.status(201).json(newTask);
  } else {
    res.status(500).json({ error: 'Failed to save task' });
  }
});

// Update Task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  if (writeTasks(tasks)) {
    res.json(tasks[index]);
  } else {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (writeTasks(tasks)) {
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// --- GHL Proxy Continued ---

// Fetch Appointments/Calendar
app.get('/api/appointments', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/calendars/events`, {
      headers: getHeaders(),
      params: { 
        locationId: process.env.GHL_LOCATION_ID,
        startTime: 0, // Starting from epoch or reasonable date
        endTime: Date.now() + (365 * 24 * 60 * 60 * 1000) // Next year
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching appointments:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch appointments',
      details: error.response?.data
    });
  }
});

// Fetch Conversations
app.get('/api/conversations', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/conversations/search`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching conversations:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch conversations',
      details: error.response?.data
    });
  }
});

// Fetch Conversation Messages
app.get('/api/conversations/:id/messages', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${GHL_API_BASE}/conversations/${id}/messages`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch messages',
      details: error.response?.data
    });
  }
});

// Send Message
app.post('/api/conversations/messages', async (req, res) => {
  try {
    const payload = {
      ...req.body,
      locationId: process.env.GHL_LOCATION_ID
    };

    console.log('Sending message to GHL:', JSON.stringify(payload, null, 2));

    const response = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload, {
      headers: getHeaders()
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to send message',
      details: error.response?.data,
      ghlError: error.response?.data?.message || 'Unknown GHL Error'
    });
  }
});

// Fetch Users/Team
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/users/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch users',
      details: error.response?.data
    });
  }
});

// Fetch Workflows
app.get('/api/workflows', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/workflows/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching workflows:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch workflows',
      details: error.response?.data,
      ghlError: error.response?.data?.message || 'Unauthorized: Missing scope in PIT'
    });
  }
});

// Fetch Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/reviews/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching reviews:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch reviews',
      details: error.response?.data
    });
  }
});

// Fetch Funnels/Sites
app.get('/api/sites/funnels', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching funnels:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch funnels',
      details: error.response?.data,
      ghlError: error.response?.data?.message || 'Unauthorized: Missing scope in PIT'
    });
  }
});

// Fetch Forms
app.get('/api/sites/forms', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/forms/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forms:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch forms',
      details: error.response?.data 
    });
  }
});

// Fetch Surveys
app.get('/api/sites/surveys', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/surveys/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching surveys:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch surveys',
      details: error.response?.data
    });
  }
});

// Fetch Payments/Transactions
app.get('/api/billing/transactions', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/orders`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch transactions' });
  }
});

// Fetch SchoolPro Courses (Memberships)
app.get('/api/school/courses', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/memberships/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching courses:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch courses',
      details: error.response?.data,
      ghlError: error.response?.data?.message || 'Unauthorized: Missing scope in PIT'
    });
  }
});

// Fetch Marketing Campaigns
app.get('/api/marketing/campaigns', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/campaigns/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching campaigns:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Dashboard Summary Stats
app.get('/api/dashboard', async (req, res) => {
  try {
    const [contacts, pipelines, opportunities] = await Promise.all([
      axios.get(`${GHL_API_BASE}/contacts/`, { headers: getHeaders(), params: { locationId: process.env.GHL_LOCATION_ID, limit: 1 } }),
      axios.get(`${GHL_API_BASE}/opportunities/pipelines`, { headers: getHeaders(), params: { locationId: process.env.GHL_LOCATION_ID } }),
      axios.get(`${GHL_API_BASE}/opportunities/search`, { headers: getHeaders(), params: { location_id: process.env.GHL_LOCATION_ID, limit: 1 } })
    ]);

    res.json({
      totalContacts: contacts.data.meta?.total || 0,
      totalOpportunities: opportunities.data.meta?.total || 0,
      totalPipelines: pipelines.data.pipelines?.length || 0,
      recentActivity: [] 
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

