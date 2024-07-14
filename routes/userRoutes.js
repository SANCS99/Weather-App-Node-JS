const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.addUser);
router.get('/', userController.getUserData);
router.put('/:id/location', userController.updateLocation);

module.exports = router;
