const express = require('express');
const router = express.Router();
const UserFacultyController = require('../controller/userFacultyController');
const auth = require('../security/authentication');

router.get('/user-faculty', auth.authenticateToken(['ALL']), UserFacultyController.getAll);
router.get('/user-faculty/by-id/:id', auth.authenticateToken(['ALL']), UserFacultyController.getById);
router.get('/user-faculty/by-user-id/:id', auth.authenticateToken(['ALL']), UserFacultyController.getByUserId);
router.get('/user-faculty/by-faculty-id/:id', auth.authenticateToken(['ALL']), UserFacultyController.getByFacultyId);
router.post('/user-faculty', auth.authenticateToken(['ALL']), UserFacultyController.create);
router.put('/user-faculty/by-id/:id', auth.authenticateToken(['ALL']), UserFacultyController.update);
router.delete('/user-faculty/by-id/:id', auth.authenticateToken(['ALL']), UserFacultyController.delete);

module.exports = router;