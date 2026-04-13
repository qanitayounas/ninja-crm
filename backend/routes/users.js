const express = require('express');
const router = express.Router();
const { proxyGet, proxyGetById, proxyPost, proxyPut, proxyDelete, locationId } = require('./_helpers');

// List users
router.get('/', proxyGet('/users/', (req) => ({
  locationId: locationId(req),
  ...req.query
})));

// Get single user
router.get('/:id', proxyGetById((p) => `/users/${p.id}`));

// Create user
router.post('/', proxyPost('/users/', (req) => ({
  ...req.body,
  locationId: locationId(req)
})));

// Update user
router.put('/:id', proxyPut((p) => `/users/${p.id}`));

// Delete user
router.delete('/:id', proxyDelete((p) => `/users/${p.id}`));

module.exports = router;
