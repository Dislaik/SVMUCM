const express = require('express');
const router = express.Router();
const ProjectStatusController = require('../controller/projectStatusController');
const auth = require('../security/authentication');

// endpoints del modelo ProjectStatus
router.get('/project-status', auth.authenticateToken, ProjectStatusController.getAll);
router.get('/project-status/by-id/:id', auth.authenticateToken, ProjectStatusController.getById);
router.get('/project-status/by-name/:name', auth.authenticateToken, ProjectStatusController.getByName);
router.get('/project-status/by-label/:label', auth.authenticateToken, ProjectStatusController.getByLabel);

module.exports = router;