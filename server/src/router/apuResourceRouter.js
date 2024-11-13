const express = require('express');
const router = express.Router();
const APUResourceController = require('../controller/apuResourceController');
const auth = require('../security/authentication');

router.get('/apu-resource', auth.authenticateToken, APUResourceController.getAll);
router.get('/apu-resource/by-id/:id', auth.authenticateToken, APUResourceController.getById);
router.get('/apu-resource/by-apu-id/:id', auth.authenticateToken, APUResourceController.getByAPUId);
router.get('/apu-resource/by-resource-id/:id', auth.authenticateToken, APUResourceController.getByResourceId);
router.post('/apu-resource', auth.authenticateToken, APUResourceController.create);
router.put('/apu-resource/by-id/:id', auth.authenticateToken, APUResourceController.update);
router.delete('/apu-resource/by-id/:id', auth.authenticateToken, APUResourceController.delete);

module.exports = router;