const express = require('express');
const router = express.Router();
const QuotationAPUResourceController = require('../controller/quotationAPUResourceController');
const auth = require('../security/authentication');

// endpoints del modelo ProjectVolunteerStudent
router.get('/quotation-apu-resource', auth.authenticateToken(['ALL']), QuotationAPUResourceController.getAll);
router.get('/quotation-apu-resource/by-id/:id', auth.authenticateToken(['ALL']), QuotationAPUResourceController.getById);
router.get('/quotation-apu-resource/by-quotation-id/:id', auth.authenticateToken(['ALL']), QuotationAPUResourceController.getByQuotationId);
router.get('/quotation-apu-resource/by-apu-id/:id', auth.authenticateToken(['ALL']), QuotationAPUResourceController.getByAPUId);
router.get('/quotation-apu-resource/by-resource-id/:id', auth.authenticateToken(['ALL']), QuotationAPUResourceController.getByResourceId);
router.post('/quotation-apu-resource', auth.authenticateToken(['ALL']), QuotationAPUResourceController.create);
router.delete('/quotation-apu-resource/by-id/:id', auth.authenticateToken(['ALL']), QuotationAPUResourceController.delete);

module.exports = router;