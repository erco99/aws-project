const User = require("../models/user");

async function users(req, res) {
  const users = await User.find({}, { name: 1, surname: 1, email: 1, balance: 1, _id: 0 }).exec();
  return res.status(200).json(users);
}

module.exports = { users };
