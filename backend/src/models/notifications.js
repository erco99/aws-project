const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  text: String,
  expiration: Date,
  owners: [String],
  accepters: [String],
  day: Date,
  field: String,
  time: { hours: Number, minutes: Number },
});

module.exports = mongoose.model("notifications", notificationSchema);
