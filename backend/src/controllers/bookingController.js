const bookings = require("../models/bookings");

async function getWeek(req, res) {
  const { from } = req.body;
  const to = new Date().setDate(from.getDate() + (7 - from.getDay()));
  try {
    const week = await bookings.find({ day: { $gte: from, $lt: to } });
    res.json(week);
  } catch (e) {
    res.status(500);
  }
}

module.exports = { getWeek };
