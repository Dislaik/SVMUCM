const express = require('express');
const router = express.Router();
const headquarterController = require('../controller/headquarterController');
const auth = require('../security/authentication');

// endpoints del modelo VolunteerStudent
router.get('/headquarter', auth.authenticateToken(['ALL']), headquarterController.getAll);
router.get('/headquarter/by-id/:id', auth.authenticateToken(['ALL']), headquarterController.getById);
router.get('/headquarter/by-name/:name', auth.authenticateToken(['ALL']), headquarterController.getByName);
router.get('/headquarter/by-label/:label', auth.authenticateToken(['ALL']), headquarterController.getByLabel);
router.post('/headquarter', auth.authenticateToken(['ALL']), headquarterController.create);
router.put('/headquarter/by-id/:id', auth.authenticateToken(['ALL']), headquarterController.update);
router.delete('/headquarter/by-id/:id', auth.authenticateToken(['ALL']), headquarterController.delete);

module.exports = router;