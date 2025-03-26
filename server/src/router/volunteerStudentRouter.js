const express = require('express');
const router = express.Router();
const VolunteerStudentController = require('../controller/volunteerStudentController');
const auth = require('../security/authentication');

// endpoints del modelo VolunteerStudent
router.get('/volunteer-student', auth.authenticateToken(['ALL']), VolunteerStudentController.getAll);
router.get('/volunteer-student/by-id/:id', auth.authenticateToken(['ALL']), VolunteerStudentController.getById);
router.get('/volunteer-student/by-run/:run', auth.authenticateToken(['ALL']), VolunteerStudentController.getByRun);
router.get('/volunteer-student/by-email/:email', auth.authenticateToken(['ALL']), VolunteerStudentController.getByEmail);
router.post('/volunteer-student', auth.authenticateToken(['ALL']), VolunteerStudentController.create);
router.put('/volunteer-student/by-id/:id', auth.authenticateToken(['ALL']), VolunteerStudentController.update);
router.delete('/volunteer-student/by-id/:id', auth.authenticateToken(['ALL']), VolunteerStudentController.delete);

module.exports = router;