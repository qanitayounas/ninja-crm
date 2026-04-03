const axios = require('axios');
require('dotenv').config({ path: 'backend/.env' });

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Version': '2021-07-28',
  'Content-Type': 'application/json'
});

async function testSendMessage() {
  console.log('--- GHL v2 Message Sending Debug ---');
  console.log('Location ID:', process.env.GHL_LOCATION_ID);

  // First, get a real contact to have a valid contactId
  let contactId;
  try {
    const contactsRes = await axios.get(`${GHL_API_BASE}/contacts/`, {
      headers: getHeaders(),
      params: { locationId: process.env.GHL_LOCATION_ID, limit: 1 }
    });
    if (contactsRes.data.contacts && contactsRes.data.contacts.length > 0) {
      contactId = contactsRes.data.contacts[0].id;
      console.log('Using real contact ID:', contactId);
    } else {
      console.log('No contacts found, cannot test message sending.');
      return;
    }
  } catch (err) {
    console.error('Failed to fetch contact:', err.response?.data || err.message);
    return;
  }

  const payload = {
    type: 'SMS',
    contactId: contactId,
    message: 'Debug message from Ninja CRM script',
    status: 'manual',
    locationId: process.env.GHL_LOCATION_ID
  };

  console.log('Sending payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload, {
      headers: getHeaders()
    });
    console.log('Success! GHL Response:', response.data);
  } catch (err) {
    console.error('FAILED with status:', err.response?.status);
    console.error('Error Details:', JSON.stringify(err.response?.data, null, 2));
    
    if (err.response?.status === 400) {
        console.log('\n--- Troubleshooting 400 ---');
        console.log('1. Trying "body" instead of "message"...');
        try {
            const payload2 = { ...payload, body: payload.message };
            delete payload2.message;
            const res2 = await axios.post(`${GHL_API_BASE}/conversations/messages`, payload2, { headers: getHeaders() });
            console.log('SUCCESS with "body"!');
        } catch (e) {
            console.log('Failed with "body" too.');
        }
    }
  }
}

testSendMessage();
