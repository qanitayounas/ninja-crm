const fs = require('fs');
const path = require('path');

const CLIENTS_FILE = path.join(__dirname, '..', 'data', 'clients.json');

const readClients = () => {
  try {
    return JSON.parse(fs.readFileSync(CLIENTS_FILE, 'utf8'));
  } catch {
    return [];
  }
};

const writeClients = (clients) => {
  fs.writeFileSync(CLIENTS_FILE, JSON.stringify(clients, null, 2), 'utf8');
};

const findByLocationId = (locationId) => {
  return readClients().find(c => c.locationId === locationId) || null;
};

const findByEmail = (email) => {
  return readClients().find(c =>
    c.locationEmail && c.locationEmail.toLowerCase() === email.toLowerCase()
  ) || null;
};

const upsertClient = (clientData) => {
  const clients = readClients();
  const index = clients.findIndex(c => c.locationId === clientData.locationId);
  const record = {
    ...clientData,
    updatedAt: new Date().toISOString()
  };
  if (index >= 0) {
    clients[index] = { ...clients[index], ...record };
  } else {
    record.createdAt = new Date().toISOString();
    clients.push(record);
  }
  writeClients(clients);
  return record;
};

const removeClient = (locationId) => {
  const clients = readClients();
  const filtered = clients.filter(c => c.locationId !== locationId);
  writeClients(filtered);
};

const getAllClients = () => readClients();

module.exports = { findByLocationId, findByEmail, upsertClient, removeClient, getAllClients };
