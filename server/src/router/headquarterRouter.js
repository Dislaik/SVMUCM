const express = require('express');
const router = express.Router();
const headquarterController = require('../controller/headquarterController');
const auth = require('../security/authentication');

// endpoints del modelo VolunteerStudent
router.get('/headquarter', auth.authenticateToken, headquarterController.getAll);
router.get('/headquarter/by-id/:id', auth.authenticateToken, headquarterController.getById);
router.get('/headquarter/by-name/:name', auth.authenticateToken, headquarterController.getByName);
router.get('/headquarter/by-label/:label', auth.authenticateToken, headquarterController.getByLabel);
router.post('/headquarter', auth.authenticateToken, headquarterController.create);
router.put('/headquarter/by-id/:id', auth.authenticateToken, headquarterController.update);
router.delete('/headquarter/by-id/:id', auth.authenticateToken, headquarterController.delete);

module.exports = router;