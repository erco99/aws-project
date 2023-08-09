const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  text: String,
  expiration: Date,
  owners: [String],
});

module.exports = mongoose.model("notifications", notificationSchema);
