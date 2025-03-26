const express = require('express');
const router = express.Router();
const RoleController = require('../controller/roleController');
const auth = require('../security/authentication');

// endpoints del modelo Role
router.get('/role', auth.authenticateToken(['ALL']), RoleController.getAll);
router.get('/role/by-id/:id', auth.authenticateToken(['ALL']), RoleController.getById);
router.get('/role/by-name/:name', auth.authenticateToken(['ALL']), RoleController.getByName);
router.get('/role/by-label/:label', auth.authenticateToken(['ALL']), RoleController.getByLabel);
router.put('/role/by-id/:id', auth.authenticateToken(['ALL']), RoleController.update);

module.exports = router;