const express = require('express');
const router = express.Router();
const VolunteerStudentController = require('../controller/volunteerStudentController');
const auth = require('../security/authentication');

// endpoints del modelo VolunteerStudent
router.get('/volunteer-student', auth.authenticateToken, VolunteerStudentController.getAll);
router.get('/volunteer-student/by-id/:id', auth.authenticateToken, VolunteerStudentController.getById);
router.get('/volunteer-student/by-run/:run', auth.authenticateToken, VolunteerStudentController.getByRun);
router.get('/volunteer-student/by-email/:email', auth.authenticateToken, VolunteerStudentController.getByEmail);
router.post('/volunteer-student', auth.authenticateToken, VolunteerStudentController.create);
router.put('/volunteer-student/by-id/:id', auth.authenticateToken, VolunteerStudentController.update);
router.delete('/volunteer-student/by-id/:id', auth.authenticateToken, VolunteerStudentController.delete);

module.exports = router;