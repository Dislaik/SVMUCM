const express = require('express');
const router = express.Router();
const ProjectUserController = require('../controller/projectUserController');
const auth = require('../security/authentication');

router.get('/project-user', auth.authenticateToken, ProjectUserController.getAll);
router.get('/project-user/by-id/:id', auth.authenticateToken, ProjectUserController.getById);
router.get('/project-user/by-project-id/:id', auth.authenticateToken, ProjectUserController.getByProjectId);
router.get('/project-user/by-user-id/:id', auth.authenticateToken, ProjectUserController.getByUserId);
router.post('/project-user', auth.authenticateToken, ProjectUserController.create);
router.put('/project-user/by-id/:id', auth.authenticateToken, ProjectUserController.update);
router.delete('/project-user/by-id/:id', auth.authenticateToken, ProjectUserController.delete);

module.exports = router;