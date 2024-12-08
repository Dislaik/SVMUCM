const express = require('express');
const router = express.Router();
const RecoveryPasswordController = require('../controller/recoveryPasswordController');

router.post('/recovery-password', RecoveryPasswordController.sendPasswordRecovery);
router.post('/recovery-password/confirm', RecoveryPasswordController.sendPasswordRecoveryConfirm);

module.exports = router;