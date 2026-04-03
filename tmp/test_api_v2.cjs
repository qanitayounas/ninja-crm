const http = require('http');

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

async function runTests() {
  try {
    console.log('Testing /api/status...');
    const status = await testEndpoint('/api/status');
    console.log('Status Result:', status);

    console.log('\nTesting /api/contacts...');
    const contacts = await testEndpoint('/api/contacts');
    console.log('Contacts Status:', contacts.status);
    if (contacts.data && contacts.data.contacts) {
      console.log('Contacts Count:', contacts.data.contacts.length);
    } else {
      console.log('Contacts Data:', contacts.data);
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

runTests();
