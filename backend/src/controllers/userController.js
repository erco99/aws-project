const User = require("../models/user");

async function users(req, res) {
  const users = await User.find({}, { name: 1, surname: 1, email: 1, _id: 0 }).exec();
  return res.status(200).json(users);
}

async function getUsersDistribution(req, res) {
  const roles = await User.find({}, { role: 1, _id:0 })
  const rolesKey = roles.map(obj => obj.role.key)
  const uniqueRolesKey = [... new Set(rolesKey)]

  const usersCount = uniqueRolesKey.map((role) => ({
    key: role,
    value: rolesKey.filter((r) => r === role).length,
  }))

  const usersDistribution = usersCount.map(obj => ({ name: obj.key, value: obj.value }))

  return res.status(200).json({ usersDistribution })
}

async function changeAvatar(req, res) {
  const { email, avatar } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) return res.sendStatus(400);

  user.avatar = avatar;
  await user.save();
  return res.status(200).json({ avatar });
}

module.exports = { users, getUsersDistribution, changeAvatar };
