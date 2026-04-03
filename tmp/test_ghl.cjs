const axios = require('axios');
require('dotenv').config({ path: '../backend/.env' });

async function testGHL() {
  const GHL_API_BASE = 'https://services.leadconnectorhq.com';
  const HEADERS = {
    'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
    'Version': '2021-07-28'
  };

  console.log('Testing GHL API with:');
  console.log('API Key:', process.env.GHL_API_KEY.substring(0, 8) + '...');
  console.log('Location ID:', process.env.GHL_LOCATION_ID);

  try {
    const response = await axios.get(`${GHL_API_BASE}/contacts/`, {
      headers: HEADERS,
      params: { locationId: process.env.GHL_LOCATION_ID }
    });
    console.log('Success! Contacts found:', response.data.contacts.length);
  } catch (error) {
    console.error('Error Status:', error.response?.status);
    console.error('Error Data:', JSON.stringify(error.response?.data, null, 2));
  }
}

testGHL();
