const bookings = require("../models/bookings");
const field = require("../models/field");

async function getWeek(req, res) {
  if (!req.body.hasOwnProperty("day")) {
    return res.sendStatus(400);
  }
  const { day } = req.body;
  if (!Date.parse(day)) {
    return res.sendStatus(400);
  }

  const from = new Date(day);
  const to = new Date();

  // Set date to nearest sunday
  to.setUTCDate(from.getDate() + (7 - from.getDay()));

  // Set time to 23:59
  to.setUTCHours(23, 59, 59, 0);
  try {
    const week = await bookings.find({ day: { $gte: from, $lte: to } });
    res.json(week);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function book(req, res) {
  const body = req.body;
  if (!body.hasOwnProperty("day") || !body.hasOwnProperty("bookings")) {
    return res.sendStatus(400);
  }
  if (!Date.parse(body.day) || typeof body.bookings != "object") {
    return res.sendStatus(400);
  }
  try {
    await bookings.findOneAndUpdate(
      { day: new Date(body.day) },
      { $push: { bookings: body.bookings } },
      { upsert: true }
    );
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getFields(req, res) {
  try {
    const fields = await field.find({});
    res.json(fields);
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = { getWeek, book, getFields };
