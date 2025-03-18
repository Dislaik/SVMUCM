const express = require('express');
const router = express.Router();
const QuotationAPUResourceController = require('../controller/quotationAPUResourceController');
const auth = require('../security/authentication');

// endpoints del modelo ProjectVolunteerStudent
router.get('/quotation-apu-resource', auth.authenticateToken, QuotationAPUResourceController.getAll);
router.get('/quotation-apu-resource/by-id/:id', auth.authenticateToken, QuotationAPUResourceController.getById);
router.get('/quotation-apu-resource/by-quotation-id/:id', auth.authenticateToken, QuotationAPUResourceController.getByQuotationId);
router.get('/quotation-apu-resource/by-apu-id/:id', auth.authenticateToken, QuotationAPUResourceController.getByAPUId);
router.get('/quotation-apu-resource/by-resource-id/:id', auth.authenticateToken, QuotationAPUResourceController.getByResourceId);
router.post('/quotation-apu-resource', auth.authenticateToken, QuotationAPUResourceController.create);
router.delete('/quotation-apu-resource/by-id/:id', auth.authenticateToken, QuotationAPUResourceController.delete);

module.exports = router;