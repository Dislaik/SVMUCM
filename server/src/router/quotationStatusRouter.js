const express = require('express');
const router = express.Router();
const QuotationStatusController = require('../controller/quotationStatusController');
const auth = require('../security/authentication');

router.get('/quotation-status', auth.authenticateToken, QuotationStatusController.getAll);
router.get('/quotation-status/by-id/:id', auth.authenticateToken, QuotationStatusController.getById);
router.get('/quotation-status/by-name/:name', auth.authenticateToken, QuotationStatusController.getByName);
router.get('/quotation-status/by-label/:label', auth.authenticateToken, QuotationStatusController.getByLabel);
router.post('/quotation-status', auth.authenticateToken, QuotationStatusController.create);
router.put('/quotation-status/by-id/:id', auth.authenticateToken, QuotationStatusController.update);
router.delete('/quotation-status/by-id/:id', auth.authenticateToken, QuotationStatusController.delete);

module.exports = router;