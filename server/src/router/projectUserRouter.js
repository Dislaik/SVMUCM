const express = require('express');
const router = express.Router();
const ProjectUserController = require('../controller/projectUserController');
const auth = require('../security/authentication');

// endpoints del modelo ProjectUser
router.get('/project-user', auth.authenticateToken(['ALL']), ProjectUserController.getAll);
router.get('/project-user/by-id/:id', auth.authenticateToken(['ALL']), ProjectUserController.getById);
router.get('/project-user/by-project-id/:id', auth.authenticateToken(['ALL']), ProjectUserController.getByProjectId);
router.get('/project-user/by-user-id/:id', auth.authenticateToken(['ALL']), ProjectUserController.getByUserId);
router.post('/project-user', auth.authenticateToken(['ALL']), ProjectUserController.create);
router.delete('/project-user/by-id/:id', auth.authenticateToken(['ALL']), ProjectUserController.delete);

module.exports = router;