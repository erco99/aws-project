const notifications = require("../models/notifications");
const bookings = require("../models/bookings");

async function getNotifications(socket, owner) {
  const query = await notifications.find({ owners: owner });
  socket.emit("notifications", query);
}

async function notifyOwner(newBooking) {
  const title = "Prenotazione " + newBooking.day;
  const subtitle =
    newBooking.field +
    " alle " +
    newBooking.time.hours +
    ":" +
    newBooking.time.minutes;
  let text = "La tua prenotazione è andata a buon fine. ";
  for (const player of newBooking.players) {
    text = text + player.name + " " + player.surname + ",";
  }
  if (newBooking.players.length === 1) {
    text = text + " ha";
  } else {
    text = text + " hanno";
  }
  text =
    text +
    " ricevuto il tuo invito. Torna qui per controllare nuovi aggiornamenti.";
  await notifications.create({
    title: title,
    subtitle: subtitle,
    text: text,
    owners: new Array(newBooking.owner.email),
  });
}

async function notifyPlayers(newBooking) {
  const title = "Invito " + newBooking.day;
  const subtitle =
    newBooking.field +
    " alle " +
    newBooking.time.hours +
    ":" +
    newBooking.time.minutes;
  let text = newBooking.owner.name + " " + newBooking.owner.surname;
  if (newBooking.players.length === 3) {
    text = text + " ha organizzato un doppio con";
    newBooking.players.forEach((player) => {
      text = text + player.name + " " + player.surname + ", ";
    });
  } else {
    text = text + " ti ha invitato a giocare una partita, ";
  }
  text =
    text +
    " se non ci sei puoi rifiutare l'invito cancellando la prenotazione. Hai tempo fino al giorno prima della prenotazione per decidere.";
  notifications.create({
    title: title,
    subtitle: subtitle,
    text: text,
    expiration: newBooking.day,
    owners: newBooking.players.map((player) => player.email),
    day: newBooking.day,
    field: newBooking.field,
    time: newBooking.time,
    accepters: [],
  });
}

async function accept(notificationId, userEmail) {
  const notificationToUpdate = await notifications.findById(notificationId);
  notificationToUpdate.accepters.push(userEmail);
  await notificationToUpdate.save();
}

async function refuse(notificationId, refuseTime) {
  const notificationToUpdate = await notifications.findById(notificationId);
  if (new Date(notificationToUpdate.expiration) > new Date(refuseTime)) {
    await bookings.updateOne(
      {
        day: notificationToUpdate.day,
        field: notificationToUpdate.field,
      },
      {
        $pull: {
          bookings: {
            "time.hours": notificationToUpdate.time.hours,
            "time.minutes": notificationToUpdate.time.minutes,
          },
        },
      }
    );
    notificationToUpdate.expiration = refuseTime;
    await notificationToUpdate.save();
    return notificationToUpdate.owners;
  }
  return undefined;
}

async function findNotificationById(notificationId) {
  return await notifications.findById(notificationId);
}

async function findInvitation({ day, field, time }) {
  return await notifications.findOne({
    day: day,
    field: field,
    "time.hours": time.hours,
    "time.minutes": time.minutes,
  });
}

module.exports = {
  notifyOwner,
  notifyPlayers,
  getNotifications,
  accept,
  refuse,
  findInvitation,
  findNotificationById,
};
