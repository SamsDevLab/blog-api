const authModel = require("../models/authModel");

async function createNewUser(req, res) {
  const { username, email, blogAuthor } = req.body;
  const newUserFields = { username, email, blogAuthor };
  const newUser = await authModel.addUser(newUserFields);
  res.json({
    user: newUser,
  });
}

module.exports = { createNewUser };
