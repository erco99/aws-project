const express = require('express');
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const authentication = require('../middlewares/authentication');

router.get("/week", authentication, weatherController.weather);

module.exports = router;