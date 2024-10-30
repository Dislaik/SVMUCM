const express = require('express');
const router = express.Router();
const ProjectStatusController = require('../controller/projectStatusController');
const auth = require('../security/authentication');

router.get('/project-status', auth.authenticateToken, ProjectStatusController.getAll);
router.get('/project-status/by-id/:id', auth.authenticateToken, ProjectStatusController.getById);
router.get('/project-status/by-name/:name', auth.authenticateToken, ProjectStatusController.getByName);
router.get('/project-status/by-label/:label', auth.authenticateToken, ProjectStatusController.getByLabel);
router.post('/project-status', auth.authenticateToken, ProjectStatusController.create);
router.put('/project-status/by-id/:id', auth.authenticateToken, ProjectStatusController.update);
router.delete('/project-status/by-id/:id', auth.authenticateToken, ProjectStatusController.delete);

module.exports = router;