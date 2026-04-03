const axios = require('axios');

async function testBackend() {
  try {
    console.log('Testing /api/status...');
    const statusRes = await axios.get('http://localhost:5000/api/status');
    console.log('Status:', statusRes.data);

    console.log('\nTesting /api/contacts...');
    const contactsRes = await axios.get('http://localhost:5000/api/contacts');
    console.log('Contacts Count:', contactsRes.data.contacts ? contactsRes.data.contacts.length : 0);
    console.log('Contacts Sample:', contactsRes.data.contacts ? contactsRes.data.contacts[0] : 'None');
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

testBackend();
