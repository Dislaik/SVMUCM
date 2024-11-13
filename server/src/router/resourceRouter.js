const express = require('express');
const router = express.Router();
const ResourceController = require('../controller/resourceController');
const auth = require('../security/authentication');

router.get('/resource', auth.authenticateToken, ResourceController.getAll);
router.get('/resource/by-id/:id', auth.authenticateToken, ResourceController.getById);
router.post('/resource', auth.authenticateToken, ResourceController.create);
router.put('/resource/by-id/:id', auth.authenticateToken, ResourceController.update);
router.delete('/resource/by-id/:id', auth.authenticateToken, ResourceController.delete);

module.exports = router;