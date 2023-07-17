const mongoose = require("mongoose");

const fieldSchema = mongoose.Schema({
  name: String,
  surface: String,
  opening: { hours: Number, minutes: Number },
  closing: { hours: Number, minutes: Number },
  state: [String],
});

module.exports = mongoose.model("field", fieldSchema);
