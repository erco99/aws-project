const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/week", bookingController.getWeek);

router.post("/book", bookingController.book);

router.get("/fields", bookingController.getFields);

module.exports = router;
