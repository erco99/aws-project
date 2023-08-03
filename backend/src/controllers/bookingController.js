const { default: mongoose } = require("mongoose");
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
            day: fieldDay.day.split("T")[0],
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

let imChecking = false;
async function book(newBooking) {
  const document = await bookings.findOne({
    day: newBooking.day,
    field: newBooking.field,
  });
  if (!document) {
    if (imChecking) {
      return Promise.reject("Concurrency conflict");
    } else {
      imChecking = true;
      const newDocument = {
        day: newBooking.day,
        field: newBooking.field,
        bookings: [
          {
            services: newBooking.services,
            players: newBooking.players,
            owner: newBooking.owner,
            time: newBooking.time,
          },
        ],
      };
      await bookings.create(newDocument);
      imChecking = false;
    }
  } else {
    // TODO: some -> newBooking.time >= instance.time && newBooking.time <= instance.time + 1
    if (
      document.bookings.some((instance) => instance.time == newBooking.time)
    ) {
      return Promise.reject("Already exist");
    }
    const newSubDocument = {
      services: newBooking.services,
      players: newBooking.players,
      owner: newBooking.owner,
      time: newBooking.time,
    };
    document.bookings.push(newSubDocument);
    await document.save();
  }
  return newBooking;
}

module.exports = { getWeek, book };
