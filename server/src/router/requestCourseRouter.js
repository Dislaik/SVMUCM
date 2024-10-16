const express = require('express');
const router = express.Router();
const requestCourseController = require('../controller/requestCourseController');
const auth = require('../security/authentication');

router.get('/request-course', auth.authenticateToken, requestCourseController.getAll);
router.get('/request-course/by-id/:id', auth.authenticateToken, requestCourseController.getById);
//router.get('/request-course/by-name/:name', auth.authenticateToken, requestCourseController.getByName);
//router.get('/request-course/by-label/:label', auth.authenticateToken, requestCourseController.getByLabel);
router.post('/request-course', auth.authenticateToken, requestCourseController.create);
router.put('/request-course/by-id/:id', auth.authenticateToken, requestCourseController.update);
router.delete('/request-course/by-id/:id', auth.authenticateToken, requestCourseController.delete);

module.exports = router;