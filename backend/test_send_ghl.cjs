const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Version': '2021-07-28',
  'Content-Type': 'application/json'
});

async function runTest() {
  console.log('--- GHL v2.0 Send Message Debugger ---');
  console.log('Token:', process.env.GHL_API_KEY ? 'Present' : 'MISSING');
  console.log('Location:', process.env.GHL_LOCATION_ID);

  // 1. Get a real contact
  console.log('\n1. Fetching a contact...');
  let contact;
  try {
    const res = await axios.get(`${GHL_API_BASE}/contacts/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID, limit: 1 }
    });
    contact = res.data.contacts?.[0];
    if (!contact) throw new Error('No contacts found');
    console.log('Found contact:', contact.id, contact.firstName);
  } catch (err) {
    console.error('Contact fetch failed:', err.response?.data || err.message);
    return;
  }

  // 2. Try the "message" payload
  console.log('\n2. Testing "message" payload (Trial 1)...');
  const payload1 = {
    type: 'SMS',
    contactId: contact.id,
    message: 'Test via message key',
    status: 'manual',
    locationId: process.env.GHL_LOCATION_ID
  };
  try {
    const res = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload1, { headers: getHeaders() });
    console.log('SUCCESS with "message" key!');
  } catch (err) {
    console.log('FAILED with "message" key:', err.response?.data?.message || err.response?.data || err.message);
  }

  // 3. Try the "body" payload (The v1 way but sometimes v2 too)
  console.log('\n3. Testing "body" payload (Trial 2)...');
  const payload2 = {
    type: 'SMS',
    contactId: contact.id,
    body: 'Test via body key',
    status: 'manual',
    locationId: process.env.GHL_LOCATION_ID
  };
  try {
    const res = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload2, { headers: getHeaders() });
    console.log('SUCCESS with "body" key!');
  } catch (err) {
    console.log('FAILED with "body" key:', err.response?.data?.message || err.response?.data || err.message);
  }

  // 4. Try without "conversationId" or with it?
  console.log('\n4. Testing without "status" field...');
  const payload3 = {
    type: 'SMS',
    contactId: contact.id,
    body: 'Test without status',
    locationId: process.env.GHL_LOCATION_ID
  };
  try {
    const res = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload3, { headers: getHeaders() });
    console.log('SUCCESS without "status"!');
  } catch (err) {
    console.log('FAILED without "status":', err.response?.data?.message || err.response?.data || err.message);
  }
}

runTest();
