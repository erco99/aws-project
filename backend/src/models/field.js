const mongoose = require("mongoose");

const fieldSchema = mongoose.Schema({
  _id: false,
  name: { type: String, required: true, unique: true, index: true },
  surface: String,
  opening: {
    type: {
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
          validator: (m) => Number.isInteger(m) && h >= 0 && h <= 59,
        },
      },
    },
    required: true,
  },
  closing: {
    type: {
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
          validator: (m) => Number.isInteger(m) && h >= 0 && h <= 59,
        },
      },
    },
    required: true,
  },
  state: [String],
});

module.exports = mongoose.model("field", fieldSchema);
