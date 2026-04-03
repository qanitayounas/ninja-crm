const axios = require('axios');
require('dotenv').config({ path: '.env' });

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Version': '2021-07-28',
  'Content-Type': 'application/json'
});

const endpoints = [
  { name: 'Contacts', path: '/contacts/', params: { locationId: process.env.GHL_LOCATION_ID, limit: 1 } },
  { name: 'Pipelines', path: '/opportunities/pipelines', params: { locationId: process.env.GHL_LOCATION_ID } },
  { name: 'Calendars', path: '/calendars/', params: { locationId: process.env.GHL_LOCATION_ID } },
  { name: 'Appointments', path: '/calendars/events', params: { locationId: process.env.GHL_LOCATION_ID, startTime: 0, endTime: Date.now() + 1000000 } },
  { name: 'Workflows', path: '/automations/workflows', params: { locationId: process.env.GHL_LOCATION_ID } },
  { name: 'Funnels', path: '/sites/funnels/', params: { locationId: process.env.GHL_LOCATION_ID } },
  { name: 'Forms', path: '/sites/forms/', params: { locationId: process.env.GHL_LOCATION_ID } },
  { name: 'Surveys', path: '/sites/surveys/', params: { locationId: process.env.GHL_LOCATION_ID } },
  { name: 'Courses (Memberships)', path: '/memberships/products', params: { locationId: process.env.GHL_LOCATION_ID } },
];

async function runTests() {
  console.log('--- GHL v2.0 API Connectivity Test ---');
  for (const ep of endpoints) {
    try {
      const res = await axios.get(`${GHL_API_BASE}${ep.path}`, {
        headers: getHeaders(),
        params: ep.params
      });
      console.log(`✅ ${ep.name}: Success (200)`);
    } catch (err) {
      console.log(`❌ ${ep.name}: Failed (${err.response?.status || 'Error'}) - ${JSON.stringify(err.response?.data?.message || err.response?.data || err.message)}`);
    }
  }
}

runTests();
