const API_BASE = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- Ninja CRM Integration Tests ---');

  // 1. Test Proxy Status
  try {
    const statusRes = await fetch(`${API_BASE}/status`);
    const statusData = await statusRes.json();
    console.log('✅ Backend Proxy Status:', statusData.status);
  } catch (err) {
    console.error('❌ Backend Proxy Offline');
    return;
  }

  // 2. Test GHL Connection (Contacts)
  try {
    const contactsRes = await fetch(`${API_BASE}/contacts`);
    const contactsData = await contactsRes.json();
    console.log('✅ GHL Contacts Fetch:', contactsData.contacts?.length || 0, 'contacts found');
  } catch (err) {
    console.error('❌ GHL Contacts Error:', err.message);
  }

  // 3. Test Local Tasks (CRUD)
  try {
    // Create
    const createRes = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Automated Test Task',
        description: 'Verifying local persistence',
        status: 'To Do'
      })
    });
    const newTask = await createRes.json();
    console.log('✅ Local Task Created:', newTask.id);

    // Read
    const tasksRes = await fetch(`${API_BASE}/tasks`);
    const tasksData = await tasksRes.json();
    const found = tasksData.tasks.find(t => t.id === newTask.id);
    if (found) console.log('✅ Local Task Read Verified');

    // Update
    await fetch(`${API_BASE}/tasks/${newTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' })
    });
    const updatedRes = await fetch(`${API_BASE}/tasks`);
    const updatedData = await updatedRes.json();
    const updatedFound = updatedData.tasks.find(t => t.id === newTask.id);
    if (updatedFound.status === 'Completed') console.log('✅ Local Task Update Verified');

    // Delete
    await fetch(`${API_BASE}/tasks/${newTask.id}`, { method: 'DELETE' });
    const finalRes = await fetch(`${API_BASE}/tasks`);
    const finalData = await finalRes.json();
    if (!finalData.tasks.find(t => t.id === newTask.id)) {
      console.log('✅ Local Task Delete Verified');
    }

  } catch (err) {
    console.error('❌ Local Tasks Error:', err.message);
  }

  console.log('--- Tests Completed ---');
}

runTests();

