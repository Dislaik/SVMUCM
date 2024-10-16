const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../security/authentication');

router.get('/user', auth.authenticateToken, userController.getAll);
router.get('/user/by-id/:id', auth.authenticateToken, userController.getById);
router.get('/user/by-username/:username', auth.authenticateToken, userController.getByUsername);
router.post('/user', auth.authenticateToken, userController.create);
router.put('/user/by-id/:id', auth.authenticateToken, userController.update);
router.delete('/user/by-id/:id', auth.authenticateToken, userController.delete);

module.exports = router;