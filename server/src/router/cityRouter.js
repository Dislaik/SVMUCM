const express = require('express');
const router = express.Router();
const CityController = require('../controller/cityController');
const auth = require('../security/authentication');

// endpoints del modelo City
router.get('/city', auth.authenticateToken(['ALL']), CityController.getAll);
router.get('/city/by-id/:id', auth.authenticateToken(['ALL']), CityController.getById);
router.get('/city/by-name/:name', auth.authenticateToken(['ALL']), CityController.getByName);
router.get('/city/by-label/:label', auth.authenticateToken(['ALL']), CityController.getByLabel);
router.get('/city/by-region-id/:id', auth.authenticateToken(['ALL']), CityController.getByRegionId);
router.get('/city/by-region-name/:name', auth.authenticateToken(['ALL']), CityController.getByRegionName);
router.post('/city', auth.authenticateToken(['ALL']), CityController.create);
router.put('/city/by-id/:id', auth.authenticateToken(['ALL']), CityController.update);
router.delete('/city/by-id/:id', auth.authenticateToken(['ALL']), CityController.delete);

module.exports = router;