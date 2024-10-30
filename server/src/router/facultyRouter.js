const express = require('express');
const router = express.Router();
const FacultyController = require('../controller/facultyController');
const auth = require('../security/authentication');

router.get('/faculty', auth.authenticateToken, FacultyController.getAll);
router.get('/faculty/by-id/:id', auth.authenticateToken, FacultyController.getById);
router.get('/faculty/by-name/:name', auth.authenticateToken, FacultyController.getByName);
router.get('/faculty/by-label/:label', auth.authenticateToken, FacultyController.getByLabel);
router.post('/faculty', auth.authenticateToken, FacultyController.create);
router.put('/faculty/by-id/:id', auth.authenticateToken, FacultyController.update);
router.delete('/faculty/by-id/:id', auth.authenticateToken, FacultyController.delete);

module.exports = router;