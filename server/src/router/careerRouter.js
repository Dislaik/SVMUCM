const express = require('express');
const router = express.Router();
const CareerController = require('../controller/careerController');
const auth = require('../security/authentication');

// endpoints del modelo Career
router.get('/career', auth.authenticateToken(['ALL']), CareerController.getAll);
router.get('/career/by-id/:id', auth.authenticateToken(['ALL']), CareerController.getById);
router.get('/career/by-name/:name', auth.authenticateToken(['ALL']), CareerController.getByName);
router.get('/career/by-label/:label', auth.authenticateToken(['ALL']), CareerController.getByLabel);
router.get('/career/by-headquarter-faculty-name/:headquarterName&:facultyName', auth.authenticateToken(['ALL']), CareerController.getByHeadquarterAndFacultyName);
router.post('/career', auth.authenticateToken(['ALL']), CareerController.create);
router.put('/career/by-id/:id', auth.authenticateToken(['ALL']), CareerController.update);
router.delete('/career/by-id/:id', auth.authenticateToken(['ALL']), CareerController.delete);

module.exports = router;