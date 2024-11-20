const express = require('express');
const router = express.Router();
const UserStatusController = require('../controller/userStatusController');
const auth = require('../security/authentication');

router.get('/user-status', auth.authenticateToken, UserStatusController.getAll);
router.get('/user-status/by-id/:id', auth.authenticateToken, UserStatusController.getById);
router.get('/user-status/by-name/:name', auth.authenticateToken, UserStatusController.getByName);
router.get('/user-status/by-label/:label', auth.authenticateToken, UserStatusController.getByLabel);
router.post('/user-status', auth.authenticateToken, UserStatusController.create);
router.put('/user-status/by-id/:id', auth.authenticateToken, UserStatusController.update);
router.delete('/user-status/by-id/:id', auth.authenticateToken, UserStatusController.delete);

module.exports = router;