const bookings = require("../models/bookings");
const field = require("../models/field");
const notificationsController = require("./notificationsController");
const transactions = require("../models/transactions");
const user = require("../models/user");
const {register} = require("./authController");

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
  if (!newBooking.myTreat) {
    const haveMoney = await checkBalances(newBooking.players, newBooking.price);if (!haveMoney) {
      return "Uno o più giocatori non hanno denaro sufficiente per partecipare";
    }
  }
  const document = await bookings.findOne({
    day: newBooking.day,
    field: newBooking.field,
  });
  if (!document) {
    if (imChecking) {
      return "Si è verificato un conflitto durante la prenotazione";
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
            price: newBooking.price,
            myTreat: newBooking.myTreat
          },
        ],
      };
      await bookings.create(newDocument);
      imChecking = false;
    }
  } else {
    if (
      document.bookings.some(
        (instance) =>
          before(instance.time, newBooking.time) >= 0 &&
          before(newBooking.time, nextHour(instance.time)) > 0
      )
    ) {
      return (
        newBooking.time.hours +
        ":" +
        newBooking.time.minutes +
        " è un orario già prenotato"
      );
    }
    const newSubDocument = {
      services: newBooking.services,
      players: newBooking.players,
      owner: newBooking.owner,
      time: newBooking.time,
      price: newBooking.price,
      myTreat: newBooking.myTreat
    };
    await bookings.updateOne(
      { _id: document._id },
      { $push: { bookings: newSubDocument } }
    );
  }
  await notificationsController.notifyOwner(newBooking);
  await notificationsController.notifyPlayers(newBooking);
  const today = new Date();
  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  if (!newBooking.myTreat) {
    for (const player of newBooking.players) {
      const userFound = await user.findOne({ email: player.email });
      userFound.balance = userFound.balance - newBooking.price;
      await userFound.save();
      await transactions.create({
        amount: newBooking.price,
        transaction_type: "negative",
        description: "Prenotazione campo",
        date,
        time,
        user: { fullname: userFound.full_name, email: userFound.email },
      });
    }
  }
  const owner = await user.findOne({ email: newBooking.owner.email });
  owner.balance = owner.balance - newBooking.price;
  await owner.save();
  await transactions.create({
    amount: newBooking.price,
    transaction_type: "negative",
    description: "Prenotazione campo",
    date,
    time,
    user: { fullname: owner.full_name, email: owner.email },
  });
  return {
    day: newBooking.day,
    field: newBooking.field,
    newBooking: {
      services: newBooking.services,
      players: newBooking.players,
      owner: newBooking.owner,
      time: newBooking.time,
      price: newBooking.price,
      myTreat: newBooking.myTreat
    },
  };
}

async function checkBalances(players, price) {
  for (const player of players) {
    const balanceObj = await user.findOne(
      { email: player.email },
      { balance: 1, _id: 0 }
    );
    if (balanceObj.balance < price) {
      return false;
    }
  }
  return true;
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

async function getYearDistribution(req, res) {
  const year = req.query.year;
  if (!year) return res.sendStatus(400);

  const yearBookings = await bookings.find({
    day: { $gte: year.concat("-01-01"), $lte: year.concat("-12-31") },
  });

  const dist = new Array(12).fill(0);
  for (const book of yearBookings) {
    const mounth = new Date(book.day).getMonth();
    dist[mounth] = dist[mounth] + book.bookings.length;
  }

  return res.status(200).json(dist);
}

async function getFieldDistribution(req, res) {
  const year = req.query.year;
  if (!year) return res.sendStatus(400);

  const fields = await field.find({}, { name: 1, _id: 0 });

  const dist = [];
  for (const field of fields) {
    const fieldBookings = await bookings.find({
      day: { $gte: year.concat("-01-01"), $lte: year.concat("-12-31") },
      field: field.name,
    });
    const data = { value: 0, name: field.name };
    for (const book of fieldBookings) {
      data.value = data.value + book.bookings.length;
    }
    dist.push(data);
  }
  res.status(200).json(dist);
}

async function deleteBooking({ day, field, time }) {
  const foundBook = await bookings.findOne({ day: day, field });
  const book = foundBook.bookings.filter(e => JSON.stringify(e.time) === JSON.stringify(time))[0];
  await refundPlayers({day, field, time}, book);

  await bookings.updateOne(
    { day: day, field: field },
    {
      $pull: {
        bookings: {
          "time.hours": time.hours,
          "time.minutes": time.minutes,
        },
      },
    }
  );

  const invitation = await notificationsController.findInvitation({
    day,
    field,
    time,
  });
  invitation.expiration = new Date();
  await invitation.save();
  await notificationsController.notifyDelete(invitation);
  return {
    owners: invitation.owners,
    inviter: invitation.inviter,
    price: book.price,
    myTreat: book.myTreat
  };
}

async function refundPlayers({day, field, time}, book) {

  const today = new Date();
  const transactionDate = [today.getDate(), (today.getMonth() + 1), today.getFullYear()].join("/");
  const transactionTime = [today.getHours(), today.getMinutes(), today.getSeconds()].join(":");
  const owner = await user.findOne({ email: book.owner.email });
  owner.balance = owner.balance + book.price;
  await owner.save();
  await transactions.create({
    amount: book.price,
    transaction_type: "positive",
    description: "Rimborso per prenotazione cancellata",
    date: transactionDate,
    time: transactionTime,
    user: { fullname: owner.full_name, email: owner.email },
  });

  if (!book.myTreat) {
    for (const player of book.players) {
      const userFound = await user.findOne({ email: player.email });
      userFound.balance = userFound.balance + book.price;
      await userFound.save();
      await transactions.create({
        amount: book.price,
        transaction_type: "positive",
        description: "Rimborso per prenotazione cancellata",
        date: transactionDate,
        time: transactionTime,
        user: { fullname: userFound.full_name, email: userFound.email },
      });
    }
  }
}

module.exports = {
  getWeek,
  book,
  getYearDistribution,
  getFieldDistribution,
  deleteBooking,
};

// Workaround for circular imports
exports.deleteBooking = deleteBooking;
