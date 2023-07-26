const express = require('express');
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const authentication = require('../middlewares/authentication');

// Get the weather for the next 7 days hourly
router.get("/week/hourly", authentication, (req, res) => weatherController.hourly(req, res, "week"));

// Get the weather of the current day hourly
router.get("/day/hourly", authentication, (req, res) => weatherController.hourly(req, res, "day"));

// Get the weather for the next 7 days daily
router.get("/week/daily", authentication, (req, res) => weatherController.daily(req, res, "week"));

// Get the weather of the current day daily
router.get("/day/daily", authentication, (req, res) => weatherController.daily(req, res, "day"));

module.exports = router;