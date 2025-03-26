const express = require('express');
const router = express.Router();
const RegionController = require('../controller/regionController');
const auth = require('../security/authentication');

// endpoints del modelo Region
router.get('/region', auth.authenticateToken(['ALL']), RegionController.getAll);
router.get('/region/by-id/:id', auth.authenticateToken(['ALL']), RegionController.getById);
router.get('/region/by-name/:name', auth.authenticateToken(['ALL']), RegionController.getByName);
router.get('/region/by-label/:label', auth.authenticateToken(['ALL']), RegionController.getByLabel);
router.post('/region', auth.authenticateToken(['ALL']), RegionController.create);
router.put('/region/by-id/:id', auth.authenticateToken(['ALL']), RegionController.update);
router.delete('/region/by-id/:id', auth.authenticateToken(['ALL']), RegionController.delete);

module.exports = router;