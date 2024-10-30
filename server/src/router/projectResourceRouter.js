const express = require('express');
const router = express.Router();
const ProjectResourceController = require('../controller/projectResourceController');
const auth = require('../security/authentication');

router.get('/project-resource', auth.authenticateToken, ProjectResourceController.getAll);
router.get('/project-resource/by-id/:id', auth.authenticateToken, ProjectResourceController.getById);
router.post('/project-resource', auth.authenticateToken, ProjectResourceController.create);
router.put('/project-resource/by-id/:id', auth.authenticateToken, ProjectResourceController.update);
router.delete('/project-resource/by-id/:id', auth.authenticateToken, ProjectResourceController.delete);

module.exports = router;