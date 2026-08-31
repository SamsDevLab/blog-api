const authModel = require("../models/authModel");

async function createNewUser(req, res) {
  const { passwordConfirmation, ...newUserData } = req.body;
  const newUser = await authModel.addUser(newUserData);
  res.json({
    user: newUser,
  });
}

module.exports = { createNewUser };
