const express = require('express');
const router = express.Router();
const ResourceController = require('../controller/resourceController');
const auth = require('../security/authentication');

// endpoints del modelo Resource
router.get('/resource', auth.authenticateToken(['ALL']), ResourceController.getAll);
router.get('/resource/by-id/:id', auth.authenticateToken(['ALL']), ResourceController.getById);
router.post('/resource', auth.authenticateToken(['ALL']), ResourceController.create);
router.put('/resource/by-id/:id', auth.authenticateToken(['ALL']), ResourceController.update);
router.delete('/resource/by-id/:id', auth.authenticateToken(['ALL']), ResourceController.delete);

module.exports = router;