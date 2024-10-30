const express = require('express');
const router = express.Router();
const RegionController = require('../controller/regionController');
const auth = require('../security/authentication');

router.get('/region', auth.authenticateToken, RegionController.getAll);
router.get('/region/by-id/:id', auth.authenticateToken, RegionController.getById);
router.get('/region/by-name/:name', auth.authenticateToken, RegionController.getByName);
router.get('/region/by-label/:label', auth.authenticateToken, RegionController.getByLabel);
router.post('/region', auth.authenticateToken, RegionController.create);
router.put('/region/by-id/:id', auth.authenticateToken, RegionController.update);
router.delete('/region/by-id/:id', auth.authenticateToken, RegionController.delete);

module.exports = router;