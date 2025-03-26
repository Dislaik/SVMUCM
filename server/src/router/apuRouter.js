const express = require('express');
const router = express.Router();
const APUController = require('../controller/apuController');
const auth = require('../security/authentication');

// endpoints del modelo APU
router.get('/apu', auth.authenticateToken(['ALL']), APUController.getAll);
router.get('/apu/by-id/:id', auth.authenticateToken(['ALL']), APUController.getById);
router.get('/apu/by-name/:name', auth.authenticateToken(['ALL']), APUController.getByName);
router.get('/apu/by-label/:label', auth.authenticateToken(['ALL']), APUController.getByLabel);
router.post('/apu', auth.authenticateToken(['ALL']), APUController.create);
router.put('/apu/by-id/:id', auth.authenticateToken(['ALL']), APUController.update);
router.delete('/apu/by-id/:id', auth.authenticateToken(['ALL']), APUController.delete);

module.exports = router