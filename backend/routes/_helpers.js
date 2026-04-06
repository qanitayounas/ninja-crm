const axios = require('axios');

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Version': '2021-07-28'
});

const locationId = () => process.env.GHL_LOCATION_ID;

// Generic proxy: GET list
const proxyGet = (ghlPath, paramsFn) => async (req, res) => {
  try {
    const params = paramsFn ? paramsFn(req) : { locationId: locationId() };
    const response = await axios.get(`${GHL_API_BASE}${ghlPath}`, {
      headers: getHeaders(),
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
      headers: getHeaders()
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
    const payload = bodyFn ? bodyFn(req) : { ...req.body, locationId: locationId() };
    const response = await axios.post(`${GHL_API_BASE}${ghlPath}`, payload, {
      headers: getHeaders()
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
    const payload = bodyFn ? bodyFn(req) : { ...req.body, locationId: locationId() };
    const response = await axios.post(`${GHL_API_BASE}${path}`, payload, {
      headers: getHeaders()
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
      headers: getHeaders()
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
      headers: getHeaders()
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
