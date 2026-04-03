const axios = require('axios');
require('dotenv').config({ path: './backend/.env' });

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

async function debugMessages() {
  console.log('--- Debugging GHL Messages ---');
  
  try {
    // 1. Get a conversation ID
    const convRes = await axios.get(`${GHL_API_BASE}/conversations/search`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Version': '2021-07-28'
      },
      params: { locationId: LOCATION_ID, limit: 1 }
    });

    const conversation = convRes.data.conversations?.[0];
    if (!conversation) {
      console.log('No conversations found.');
      return;
    }

    console.log(`Found Conversation ID: ${conversation.id}`);

    // 2. Get messages for this conversation
    const msgRes = await axios.get(`${GHL_API_BASE}/conversations/${conversation.id}/messages`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Version': '2021-07-28'
      },
      params: { locationId: LOCATION_ID }
    });

    console.log('Messages Response Structure:', JSON.stringify(msgRes.data, null, 2).substring(0, 500));
    console.log('Type of data.messages:', typeof msgRes.data.messages);
    console.log('Is array?:', Array.isArray(msgRes.data.messages));

  } catch (error) {
    console.error('Debug Error:', error.response?.data || error.message);
  }
}

debugMessages();
