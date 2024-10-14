const express = require('express');
const router = express.Router();
const courseModeController = require('../controller/courseModeController');
const auth = require('../security/authentication');

router.get('/course-mode', auth.authenticateToken, courseModeController.getAll);
router.get('/course-mode/by-id/:id', auth.authenticateToken, courseModeController.getById);
router.get('/course-mode/by-name/:name', auth.authenticateToken, courseModeController.getByName);
router.get('/course-mode/by-label/:label', auth.authenticateToken, courseModeController.getByLabel);
router.post('/course-mode', auth.authenticateToken, courseModeController.create);
router.put('/course-mode/by-id/:id', auth.authenticateToken, courseModeController.update);
router.delete('/course-mode/by-id/:id', auth.authenticateToken, courseModeController.delete);

module.exports = router;