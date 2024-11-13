const express = require('express');
const router = express.Router();
const ProjectController = require('../controller/projectController');
const auth = require('../security/authentication');

router.get('/project', auth.authenticateToken, ProjectController.getAll);
router.get('/project/by-id/:id', auth.authenticateToken, ProjectController.getById);
router.get('/project/by-user-id/:id', auth.authenticateToken, ProjectController.getByUserId);
router.post('/project', auth.authenticateToken, ProjectController.create);
router.put('/project/by-id/:id', auth.authenticateToken, ProjectController.update);
router.delete('/project/by-id/:id', auth.authenticateToken, ProjectController.delete);

module.exports = router;