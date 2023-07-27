const express = require('express');
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const authentication = require('../middlewares/authentication');

// Get the weather from the day of the request to the first sunday hourly
router.get("/hourly", authentication, (req, res) =>  weatherController.weather(req, res, "hourly"));

// Get the weather from the day of the request to the first sunday daily
router.get("/daily", authentication, (req, res) =>  weatherController.weather(req, res, "daily"));

module.exports = router;