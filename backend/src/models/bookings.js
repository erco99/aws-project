const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  _id: false,
  day: { type: Date, required: true, unique: true, index: true },
  bookings: [
    {
      _id: false,
      field: { type: String, required: true },
      players: [{ name: String, surname: String, _id: false, id: String }],
      owner: { name: String, surname: String, _id: false, id: String },
      time: {
        _id: false,
        hours: {
          type: Number,
          required: true,
          validate: {
            validator: (h) => Number.isInteger(h) && h >= 0 && h <= 23,
          },
        },
        minutes: {
          type: Number,
          required: true,
          validate: {
            validator: (h) => Number.isInteger(h) && h >= 0 && h <= 59,
          },
        },
      },
    },
  ],
});

module.exports = mongoose.model("bookings", booksSchema);
