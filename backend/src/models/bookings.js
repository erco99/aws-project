const mongoose = require("mongoose");
const field = require("./field");

const booksSchema = mongoose.Schema({
  day: { type: Date, required: true },
  field: { type: String, required: true, ref: field },
  bookings: [
    {
      _id: false,
      players: [{ name: String, surname: String, _id: false, email: String }],
      owner: { name: String, surname: String, _id: false, email: String },
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
booksSchema.index({ day: 1, field: -1 });
module.exports = mongoose.model("bookings", booksSchema);
