const bookings = require("../models/bookings");
const field = require("../models/field");

async function getWeek(socket, day) {
  const from = new Date(day);
  const to = new Date();

  // Set date to nearest sunday
  to.setUTCDate(from.getDate() + (7 - from.getDay()));

  // Set time to 23:59
  to.setUTCHours(23, 59, 59, 0);

  // Make querys
  try {
    const week = await bookings.find({ day: { $gte: from, $lte: to } });
    const fields = await field.find({}).sort({ name: 1 });
    // Assemble response and emit
    for (const field of fields) {
      field.bookings = [];
    }
    for (const field of fields) {
      for (const fieldDay of week) {
        if (field.name == fieldDay.field) {
          field.bookings.push({
            day: fieldDay.day,
            bookings: fieldDay.bookings,
          });
        }
      }
    }
    socket.emit("week", fields);
  } catch (e) {
    socket.emit("error", e);
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

module.exports = { getWeek };
