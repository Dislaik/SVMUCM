const express = require('express');
const router = express.Router();
const APUController = require('../controller/apuController');
const auth = require('../security/authentication');

// endpoints del modelo APU
router.get('/apu', auth.authenticateToken, APUController.getAll);
router.get('/apu/by-id/:id', auth.authenticateToken, APUController.getById);
router.get('/apu/by-name/:name', auth.authenticateToken, APUController.getByName);
router.get('/apu/by-label/:label', auth.authenticateToken, APUController.getByLabel);
router.post('/apu', auth.authenticateToken, APUController.create);
router.put('/apu/by-id/:id', auth.authenticateToken, APUController.update);
router.delete('/apu/by-id/:id', auth.authenticateToken, APUController.delete);

module.exports = router