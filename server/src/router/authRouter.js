const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// endpoints de Auth de los User
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/verify', authController.verify);

module.exports = router;