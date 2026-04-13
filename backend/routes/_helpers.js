const axios = require('axios');

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

// Returns headers using per-client OAuth token or API key
const getHeaders = (req) => {
  const client = req?.ghlClient;
  let token;

  if (client?.accessToken && client?.userType === 'Location') {
    token = client.accessToken;
    console.log('Using Location OAuth token for API call');
  } else {
    token = process.env.GHL_API_KEY;
    console.log('Using API key for API call (userType:', client?.userType, ')');
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Version': '2021-07-28'
  };
};

// Returns locationId - for Location tokens use client's, otherwise use env
const locationId = (req) => {
  const client = req?.ghlClient;
  if (client?.userType === 'Location' && client?.locationId) {
    return client.locationId;
  }
  return process.env.GHL_LOCATION_ID;
};

// Generic proxy: GET list
const proxyGet = (ghlPath, paramsFn) => async (req, res) => {
  try {
    const params = paramsFn ? paramsFn(req) : { locationId: locationId(req) };
    const response = await axios.get(`${GHL_API_BASE}${ghlPath}`, {
      headers: getHeaders(req),
      params
    });
    res.json(response.data);
  } catch (error) {
    console.error(`GET ${ghlPath} error:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to GET ${ghlPath}`,
      details: error.response?.data
    });
  }
};

// Generic proxy: GET single by ID
const proxyGetById = (ghlPathFn) => async (req, res) => {
  try {
    const path = ghlPathFn(req.params);
    const response = await axios.get(`${GHL_API_BASE}${path}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    console.error(`GET ${ghlPathFn(req.params)} error:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to fetch resource`,
      details: error.response?.data
    });
  }
};

// Generic proxy: POST create
const proxyPost = (ghlPath, bodyFn) => async (req, res) => {
  try {
    const payload = bodyFn ? bodyFn(req) : { ...req.body, locationId: locationId(req) };
    const response = await axios.post(`${GHL_API_BASE}${ghlPath}`, payload, {
      headers: getHeaders(req)
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error(`POST ${ghlPath} error:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to POST ${ghlPath}`,
      details: error.response?.data
    });
  }
};

// Generic proxy: POST with dynamic path
const proxyPostDynamic = (ghlPathFn, bodyFn) => async (req, res) => {
  try {
    const path = ghlPathFn(req.params);
    const payload = bodyFn ? bodyFn(req) : { ...req.body, locationId: locationId(req) };
    const response = await axios.post(`${GHL_API_BASE}${path}`, payload, {
      headers: getHeaders(req)
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error(`POST ${ghlPathFn(req.params)} error:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to create resource`,
      details: error.response?.data
    });
  }
};

// Generic proxy: PUT update
const proxyPut = (ghlPathFn) => async (req, res) => {
  try {
    const path = ghlPathFn(req.params);
    const response = await axios.put(`${GHL_API_BASE}${path}`, req.body, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    console.error(`PUT ${ghlPathFn(req.params)} error:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to update resource`,
      details: error.response?.data
    });
  }
};

// Generic proxy: DELETE
const proxyDelete = (ghlPathFn) => async (req, res) => {
  try {
    const path = ghlPathFn(req.params);
    const response = await axios.delete(`${GHL_API_BASE}${path}`, {
      headers: getHeaders(req)
    });
    res.json(response.data);
  } catch (error) {
    console.error(`DELETE ${ghlPathFn(req.params)} error:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to delete resource`,
      details: error.response?.data
    });
  }
};

module.exports = {
  GHL_API_BASE,
  getHeaders,
  locationId,
  proxyGet,
  proxyGetById,
  proxyPost,
  proxyPostDynamic,
  proxyPut,
  proxyDelete
};
