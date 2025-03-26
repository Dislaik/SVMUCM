const express = require('express');
const router = express.Router();
const UserStatusController = require('../controller/userStatusController');
const auth = require('../security/authentication');

// endpoints del modelo UserStatus
router.get('/user-status', auth.authenticateToken(['ALL']), UserStatusController.getAll);
router.get('/user-status/by-id/:id', auth.authenticateToken(['ALL']), UserStatusController.getById);
router.get('/user-status/by-name/:name', auth.authenticateToken(['ALL']), UserStatusController.getByName);
router.get('/user-status/by-label/:label', auth.authenticateToken(['ALL']), UserStatusController.getByLabel);

module.exports = router;