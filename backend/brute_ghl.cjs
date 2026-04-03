const axios = require('axios');
require('dotenv').config({ path: '.env' });

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Version': '2021-07-28',
  'Content-Type': 'application/json'
});

async function bruteForce() {
  const trialPaths = [
    '/sites/funnels',
    '/sites/funnels/',
    '/funnels',
    '/funnels/',
    '/automations/workflows',
    '/automations/workflows/',
    '/workflows',
    '/workflows/',
    '/sites/forms',
    '/sites/forms/',
    '/forms',
    '/forms/',
    '/courses/courses',
    '/courses/products',
    '/memberships/products',
    '/memberships/courses'
  ];

  console.log('--- GHL v2.0 Endpoint Brute-Force ---');
  for (const path of trialPaths) {
    try {
      const res = await axios.get(`${GHL_API_BASE}${path}`, {
        headers: getHeaders(),
        params: { locationId: process.env.GHL_LOCATION_ID }
      });
      console.log(`✅ ${path}: Success (200)`);
    } catch (err) {
      console.log(`❌ ${path}: ${err.response?.status || 'Error'}`);
    }
  }
}

bruteForce();
