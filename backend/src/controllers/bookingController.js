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
    const response = [];
    for (const field of fields) {
      const json = {
        name: field.name,
        closing: field.closing,
        opening: field.opening,
        minutes: field.minutes,
        surface: field.surface,
        state: field.state,
        bookingsPerDay: [],
      };
      for (const fieldDay of week) {
        if (field.name === fieldDay.field) {
          json.bookingsPerDay.push({
            day: fieldDay.day.toISOString().split("T")[0],
            bookings: fieldDay.bookings,
          });
        }
      }
      response.push(json);
    }
    socket.emit("week", response);
  } catch (error) {
    console.log(error);
    socket.emit("error", error.message);
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
      return "Concurrency conflict";
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
      document.bookings.some(
        (instance) =>
          before(instance.time, newBooking.time) >= 0 &&
          before(newBooking.time, nextHour(instance.time)) >= 0
      )
    ) {
      return "Already exist";
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

// Return > 0 if time1 < time2
// Return = 0 if time1 = time2
// Return < 0 if time1 > time2
function before(time1, time2) {
  const diff = time2.hours - time1.hours;
  if (diff === 0) {
    return time2.minutes - time1.minutes;
  }
  return diff;
}

function nextHour(time) {
  time.hours = time.hours + 1;
  return time;
}

module.exports = { getWeek, book };
