const authModel = require("../models/authModel");

async function createNewUser(req, res) {
  const newUser = await authModel.addUser(req, res);
  res.json({
    user: newUser,
  });
}

module.exports = { createNewUser };
