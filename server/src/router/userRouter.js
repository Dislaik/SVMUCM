const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../security/authentication');

// endpoints del modelo User
router.get('/user', auth.authenticateToken(['ALL']), userController.getAll);
router.get('/user/by-id/:id', auth.authenticateToken(['ALL']), userController.getById);
router.get('/user/by-username/:username', auth.authenticateToken(['ALL']), userController.getByUsername);
router.post('/user', auth.authenticateToken(['STAFF']), userController.create);
router.put('/user/by-id/:id', auth.authenticateToken(['STAFF']), userController.update);
router.get('/user/count/:id', userController.getCountByRoleId);

module.exports = router;