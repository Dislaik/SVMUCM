const express = require('express');
const router = express.Router();
const ProjectController = require('../controller/projectController');
const auth = require('../security/authentication');

// endpoints del modelo Project
router.get('/project', auth.authenticateToken(['ALL']), ProjectController.getAll);
router.get('/project/by-id/:id', auth.authenticateToken(['ALL']), ProjectController.getById);
router.get('/project/by-user-id/:id', auth.authenticateToken(['ALL']), ProjectController.getByUserId);
router.post('/project', auth.authenticateToken(['ALL']), ProjectController.create);
router.put('/project/by-id/:id', auth.authenticateToken(['ALL']), ProjectController.update);

module.exports = router;