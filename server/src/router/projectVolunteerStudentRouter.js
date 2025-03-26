const express = require('express');
const router = express.Router();
const ProjectVolunteerStudentController = require('../controller/projectVolunteerStudentController');
const auth = require('../security/authentication');

// endpoints del modelo ProjectVolunteerStudent
router.get('/project-volunteer-student', auth.authenticateToken(['ALL']), ProjectVolunteerStudentController.getAll);
router.get('/project-volunteer-student/by-id/:id', auth.authenticateToken(['ALL']), ProjectVolunteerStudentController.getById);
router.get('/project-volunteer-student/by-project-id/:id', auth.authenticateToken(['ALL']), ProjectVolunteerStudentController.getByProjectId);
router.get('/project-volunteer-student/by-volunteer-student-id/:id', auth.authenticateToken(['ALL']), ProjectVolunteerStudentController.getByVolunteerStudentId);
router.post('/project-volunteer-student', auth.authenticateToken(['ALL']), ProjectVolunteerStudentController.create);
router.delete('/project-volunteer-student/by-id/:id', auth.authenticateToken(['ALL']), ProjectVolunteerStudentController.delete);

module.exports = router;