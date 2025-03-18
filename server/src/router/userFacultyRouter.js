const express = require('express');
const router = express.Router();
const UserFacultyController = require('../controller/userFacultyController');
const auth = require('../security/authentication');

router.get('/user-faculty', auth.authenticateToken, UserFacultyController.getAll);
router.get('/user-faculty/by-id/:id', auth.authenticateToken, UserFacultyController.getById);
router.get('/user-faculty/by-user-id/:id', auth.authenticateToken, UserFacultyController.getByUserId);
router.get('/user-faculty/by-faculty-id/:id', auth.authenticateToken, UserFacultyController.getByFacultyId);
router.post('/user-faculty', auth.authenticateToken, UserFacultyController.create);
router.put('/user-faculty/by-id/:id', auth.authenticateToken, UserFacultyController.update);
router.delete('/user-faculty/by-id/:id', auth.authenticateToken, UserFacultyController.delete);

module.exports = router;