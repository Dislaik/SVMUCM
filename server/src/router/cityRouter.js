const express = require('express');
const router = express.Router();
const CityController = require('../controller/cityController');
const auth = require('../security/authentication');

// endpoints del modelo City
router.get('/city', auth.authenticateToken, CityController.getAll);
router.get('/city/by-id/:id', auth.authenticateToken, CityController.getById);
router.get('/city/by-name/:name', auth.authenticateToken, CityController.getByName);
router.get('/city/by-label/:label', auth.authenticateToken, CityController.getByLabel);
router.get('/city/by-region-id/:id', auth.authenticateToken, CityController.getByRegionId);
router.get('/city/by-region-name/:name', auth.authenticateToken, CityController.getByRegionName);
router.post('/city', auth.authenticateToken, CityController.create);
router.put('/city/by-id/:id', auth.authenticateToken, CityController.update);
router.delete('/city/by-id/:id', auth.authenticateToken, CityController.delete);

module.exports = router;