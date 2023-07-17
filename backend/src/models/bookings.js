const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  day: Date,
  bookings: [
    {
      field: String,
      players: [{ name: String, surname: String, id: String }],
      owner: { name: String, surname: String, id: String },
      time: { hours: Number, minutes: Number },
    },
  ],
});

module.exports = mongoose.model("bookings", booksSchema);
