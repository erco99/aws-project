const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/week", bookingController.getWeek);

module.exports = router;
