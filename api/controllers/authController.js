const authModel = require("../models/authModel");

async function createNewUser(req, res) {
  const { passwordConfirmation, ...newUserData } = req.body;
  const newUserConfirmation = await authModel.addUser(newUserData);

  res.json({
    newUserConfirmation,
  });
}

module.exports = { createNewUser };
