const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const auth = require('../security/authentication');

router.get('/role', auth.authenticateToken, roleController.getAll);
router.get('/role/by-id/:id', auth.authenticateToken, roleController.getById);
//router.get('/role/by-name/:name', auth.authenticateToken, roleController.getByName);
router.post('/role', auth.authenticateToken, roleController.create);
router.put('/role/by-id/:id', auth.authenticateToken, roleController.update);
router.delete('/role/by-id/:id', auth.authenticateToken, roleController.delete);

module.exports = router;