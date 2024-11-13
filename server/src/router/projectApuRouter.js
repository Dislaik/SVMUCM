const express = require('express');
const router = express.Router();
const ProjectAPUController = require('../controller/projectApuController');
const auth = require('../security/authentication');

router.get('/project-apu', auth.authenticateToken, ProjectAPUController.getAll);
router.get('/project-apu/by-id/:id', auth.authenticateToken, ProjectAPUController.getById);
router.get('/project-apu/by-project-id/:id', auth.authenticateToken, ProjectAPUController.getByProjectId);
router.get('/project-apu/by-apu-id/:id', auth.authenticateToken, ProjectAPUController.getByAPUId);
router.post('/project-apu', auth.authenticateToken, ProjectAPUController.create);
router.put('/project-apu/by-id/:id', auth.authenticateToken, ProjectAPUController.update);
router.delete('/project-apu/by-id/:id', auth.authenticateToken, ProjectAPUController.delete);

module.exports = router;