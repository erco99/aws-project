const bookings = require("../models/bookings");

async function getWeek(req, res) {
  // Iitialization
  const { day } = req.body;
  const from = new Date(day);
  const to = new Date();

  // Set date to nearest sunday
  to.setUTCDate(from.getDate() + (7 - from.getDay()));

  // Set time to 23:59
  to.setUTCHours(23, 59, 59, 0);

  // Query
  const week = await bookings.find({ day: { $gte: from, $lte: to } });

  // Response
  res.json(week);
}

module.exports = { getWeek };
