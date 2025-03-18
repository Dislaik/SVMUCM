const express = require('express');
const router = express.Router();
const ProjectVolunteerStudentController = require('../controller/projectVolunteerStudentController');
const auth = require('../security/authentication');

// endpoints del modelo ProjectVolunteerStudent
router.get('/project-volunteer-student', auth.authenticateToken, ProjectVolunteerStudentController.getAll);
router.get('/project-volunteer-student/by-id/:id', auth.authenticateToken, ProjectVolunteerStudentController.getById);
router.get('/project-volunteer-student/by-project-id/:id', auth.authenticateToken, ProjectVolunteerStudentController.getByProjectId);
router.get('/project-volunteer-student/by-volunteer-student-id/:id', auth.authenticateToken, ProjectVolunteerStudentController.getByVolunteerStudentId);
router.post('/project-volunteer-student', auth.authenticateToken, ProjectVolunteerStudentController.create);
router.delete('/project-volunteer-student/by-id/:id', auth.authenticateToken, ProjectVolunteerStudentController.delete);

module.exports = router;