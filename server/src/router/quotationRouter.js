const express = require('express');
const router = express.Router();
const QuotationController = require('../controller/quotationController');
const auth = require('../security/authentication');

// endpoints del modelo Quotation
router.get('/quotation', auth.authenticateToken, QuotationController.getAll);
router.get('/quotation/by-id/:id', auth.authenticateToken, QuotationController.getById);
router.get('/quotation/by-project-id/:id', auth.authenticateToken, QuotationController.getByProjectId);
router.post('/quotation', auth.authenticateToken, QuotationController.create);
router.put('/quotation/by-id/:id', auth.authenticateToken, QuotationController.update);

module.exports = router;