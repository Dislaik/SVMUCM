const express = require('express');
const router = express.Router();
const CareerController = require('../controller/careerController');
const auth = require('../security/authentication');

// endpoints del modelo Career
router.get('/career', auth.authenticateToken, CareerController.getAll);
router.get('/career/by-id/:id', auth.authenticateToken, CareerController.getById);
router.get('/career/by-name/:name', auth.authenticateToken, CareerController.getByName);
router.get('/career/by-label/:label', auth.authenticateToken, CareerController.getByLabel);
router.get('/career/by-headquarter-faculty-name/:headquarterName&:facultyName', auth.authenticateToken, CareerController.getByHeadquarterAndFacultyName);
router.post('/career', auth.authenticateToken, CareerController.create);
router.put('/career/by-id/:id', auth.authenticateToken, CareerController.update);
router.delete('/career/by-id/:id', auth.authenticateToken, CareerController.delete);

module.exports = router;