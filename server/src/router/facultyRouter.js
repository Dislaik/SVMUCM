const express = require('express');
const router = express.Router();
const FacultyController = require('../controller/facultyController');
const auth = require('../security/authentication');

// endpoints del modelo Faculty
router.get('/faculty', auth.authenticateToken(['ALL']), FacultyController.getAll);
router.get('/faculty/by-id/:id', auth.authenticateToken(['ALL']), FacultyController.getById);
router.get('/faculty/by-name/:name', auth.authenticateToken(['ALL']), FacultyController.getByName);
router.get('/faculty/by-label/:label', auth.authenticateToken(['ALL']), FacultyController.getByLabel);
router.post('/faculty', auth.authenticateToken(['ALL']), FacultyController.create);
router.put('/faculty/by-id/:id', auth.authenticateToken(['ALL']), FacultyController.update);
router.delete('/faculty/by-id/:id', auth.authenticateToken(['ALL']), FacultyController.delete);

module.exports = router;