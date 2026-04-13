const express = require('express');
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

// ========================
// Auth Routes (no middleware needed - public)
// ========================
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// ========================
// Client Auth Middleware (all /api/* routes below are protected)
// ========================
const clientAuth = require('./middleware/clientAuth');
app.use('/api', clientAuth);

// ========================
// Route Modules (GHL API Proxy) - Protected by clientAuth
// ========================

const contactsRouter = require('./routes/contacts');
const conversationsRouter = require('./routes/conversations');
const usersRouter = require('./routes/users');
const opportunitiesRouter = require('./routes/opportunities');
const calendarsRouter = require('./routes/calendars');
const paymentsRouter = require('./routes/payments');
const invoicesRouter = require('./routes/invoices');
const productsRouter = require('./routes/products');
const locationsRouter = require('./routes/locations');
const businessesRouter = require('./routes/businesses');
const objectsRouter = require('./routes/objects');
const coursesRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const emailsRouter = require('./routes/emails');
const phoneRouter = require('./routes/phone');
const socialRouter = require('./routes/social');
const blogsRouter = require('./routes/blogs');
const documentsRouter = require('./routes/documents');
const funnelsRouter = require('./routes/funnels');
const marketingRouter = require('./routes/marketing');
const miscRouter = require('./routes/misc');

// Mount route modules
app.use('/api/contacts', contactsRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/users', usersRouter);
app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/calendars', calendarsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/products', productsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/businesses', businessesRouter);
app.use('/api/objects', objectsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/media', mediaRouter);
app.use('/api/emails', emailsRouter);
app.use('/api/phone-numbers', phoneRouter);
app.use('/api/social', socialRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/funnels', funnelsRouter);
app.use('/api/marketing', marketingRouter);
app.use('/api', miscRouter); // charges, recurring-tasks, links, saas, reviews mounted at /api root

// ========================
// Legacy Endpoints (backwards compatible)
// ========================

// These keep old frontend paths working while new route modules are adopted

const axios = require('axios');
const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const getClientHeaders = (req) => {
  const client = req.ghlClient;
  const token = (client?.accessToken && client?.userType === 'Location')
    ? client.accessToken
    : process.env.GHL_API_KEY;
  return {
    'Authorization': `Bearer ${token}`,
    'Version': '2021-07-28'
  };
};
const getClientLocationId = (req) => {
  const client = req.ghlClient;
  if (client?.userType === 'Location' && client?.locationId) {
    return client.locationId;
  }
  return process.env.GHL_LOCATION_ID;
};

// GET /api/pipelines -> redirect to opportunities router pattern
app.get('/api/pipelines', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/opportunities/pipelines`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch pipelines', details: error.response?.data });
  }
});

// GET /api/appointments -> legacy calendar events (fetches all calendars first)
app.get('/api/appointments', async (req, res) => {
  try {
    // First get all calendars to get a calendarId
    const calRes = await axios.get(`${GHL_API_BASE}/calendars/`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    const calendars = calRes.data.calendars || [];
    if (calendars.length === 0) return res.json({ events: [] });

    const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

    const allEvents = [];
    for (const cal of calendars) {
      try {
        const evRes = await axios.get(`${GHL_API_BASE}/calendars/events`, {
          headers: getClientHeaders(req),
          params: { locationId: getClientLocationId(req), calendarId: cal.id, startTime, endTime }
        });
        allEvents.push(...(evRes.data.events || []));
      } catch (e) { /* skip */ }
    }
    res.json({ events: allEvents });
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch appointments', details: error.response?.data });
  }
});

// GET /api/workflows -> legacy
app.get('/api/workflows', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/workflows/`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch workflows', details: error.response?.data });
  }
});

// GET /api/sites/funnels -> legacy
app.get('/api/sites/funnels', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/funnels/funnel/list`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch funnels', details: error.response?.data });
  }
});

// GET /api/sites/forms -> legacy
app.get('/api/sites/forms', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/forms/`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch forms', details: error.response?.data });
  }
});

// GET /api/sites/surveys -> legacy
app.get('/api/sites/surveys', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/surveys/`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch surveys', details: error.response?.data });
  }
});

// GET /api/billing/transactions -> legacy
app.get('/api/billing/transactions', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/payments/orders`, {
      headers: getClientHeaders(req),
      params: { altId: getClientLocationId(req), altType: 'location' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch transactions', details: error.response?.data });
  }
});

// GET /api/school/courses -> legacy
app.get('/api/school/courses', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/courses/`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch courses', details: error.response?.data });
  }
});

// GET /api/marketing/campaigns -> legacy
app.get('/api/marketing/campaigns', async (req, res) => {
  try {
    const response = await axios.get(`${GHL_API_BASE}/campaigns/`, {
      headers: getClientHeaders(req),
      params: { locationId: getClientLocationId(req) }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch campaigns', details: error.response?.data });
  }
});

// ========================
// Dashboard Aggregation
// ========================

app.get('/api/dashboard', async (req, res) => {
  try {
    const [contacts, pipelines, opportunities] = await Promise.all([
      axios.get(`${GHL_API_BASE}/contacts/`, { headers: getClientHeaders(req), params: { locationId: getClientLocationId(req), limit: 1 } }),
      axios.get(`${GHL_API_BASE}/opportunities/pipelines`, { headers: getClientHeaders(req), params: { locationId: getClientLocationId(req) } }),
      axios.get(`${GHL_API_BASE}/opportunities/search`, { headers: getClientHeaders(req), params: { location_id: getClientLocationId(req), limit: 1 } })
    ]);

    res.json({
      totalContacts: contacts.data.meta?.total || 0,
      totalOpportunities: opportunities.data.meta?.total || 0,
      totalPipelines: pipelines.data.pipelines?.length || 0,
      recentActivity: []
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// ========================
// Local Tasks (file-based)
// ========================

const readTasks = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    return true;
  } catch (err) {
    return false;
  }
};

app.get('/api/tasks', (req, res) => {
  res.json({ tasks: readTasks() });
});

app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = { id: `t-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...req.body };
  tasks.push(newTask);
  if (writeTasks(tasks)) res.status(201).json(newTask);
  else res.status(500).json({ error: 'Failed to save task' });
});

app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date().toISOString() };
  if (writeTasks(tasks)) res.json(tasks[index]);
  else res.status(500).json({ error: 'Failed to update task' });
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const len = tasks.length;
  tasks = tasks.filter(t => t.id !== req.params.id);
  if (tasks.length === len) return res.status(404).json({ error: 'Task not found' });
  if (writeTasks(tasks)) res.json({ message: 'Task deleted successfully' });
  else res.status(500).json({ error: 'Failed to delete task' });
});

// ========================
// Status Check
// ========================

app.get('/api/status', (req, res) => {
  res.json({ status: 'Online', message: 'Ninja CRM Backend Proxy is running.', modules: 21 });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log('Loaded route modules: contacts, conversations, users, opportunities, calendars, payments, invoices, products, locations, businesses, objects, courses, media, emails, phone, social, blogs, documents, funnels, marketing, misc');
});
