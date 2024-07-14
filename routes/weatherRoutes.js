const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.post('/', weatherController.createWeatherData);
router.get('/:userId/:date', weatherController.getWeatherData);

module.exports = router;
