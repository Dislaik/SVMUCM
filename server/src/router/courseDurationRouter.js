const express = require('express');
const router = express.Router();
const courseDurationController = require('../controller/courseDurationController');
const auth = require('../security/authentication');

router.get('/course-duration', auth.authenticateToken, courseDurationController.getAll);
router.get('/course-duration/by-id/:id', auth.authenticateToken, courseDurationController.getById);
router.get('/course-duration/by-name/:name', auth.authenticateToken, courseDurationController.getByName);
router.get('/course-duration/by-label/:label', auth.authenticateToken, courseDurationController.getByLabel);
router.post('/course-duration', auth.authenticateToken, courseDurationController.create);
router.put('/course-duration/by-id/:id', auth.authenticateToken, courseDurationController.update);
router.delete('/course-duration/by-id/:id', auth.authenticateToken, courseDurationController.delete);

module.exports = router;