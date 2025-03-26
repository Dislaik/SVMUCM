const express = require('express');
const router = express.Router();
const QuotationStatusController = require('../controller/quotationStatusController');
const auth = require('../security/authentication');

// endpoints del modelo QuotationStatus
router.get('/quotation-status', auth.authenticateToken(['ALL']), QuotationStatusController.getAll);
router.get('/quotation-status/by-id/:id', auth.authenticateToken(['ALL']), QuotationStatusController.getById);
router.get('/quotation-status/by-name/:name', auth.authenticateToken(['ALL']), QuotationStatusController.getByName);
router.get('/quotation-status/by-label/:label', auth.authenticateToken(['ALL']), QuotationStatusController.getByLabel);

module.exports = router;