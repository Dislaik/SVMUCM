const express = require('express');
const router = express.Router();
const APUResourceController = require('../controller/apuResourceController');
const auth = require('../security/authentication');

// endpoints del modelo APUResource
router.get('/apu-resource', auth.authenticateToken(['ALL']), APUResourceController.getAll);
router.get('/apu-resource/by-id/:id', auth.authenticateToken(['ALL']), APUResourceController.getById);
router.get('/apu-resource/by-apu-id/:id', auth.authenticateToken(['ALL']), APUResourceController.getByAPUId);
router.get('/apu-resource/by-resource-id/:id', auth.authenticateToken(['ALL']), APUResourceController.getByResourceId);
router.post('/apu-resource', auth.authenticateToken(['ALL']), APUResourceController.create);
router.put('/apu-resource/by-id/:id', auth.authenticateToken(['ALL']), APUResourceController.update);
router.delete('/apu-resource/by-id/:id', auth.authenticateToken(['ALL']), APUResourceController.delete);

module.exports = router;