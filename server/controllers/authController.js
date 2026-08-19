async function createNewUser(req, res) {
  res.json({
    message: "Created new user!",
  });
}

async function loginUser(req, res) {
  res.json({
    message: "User is logged in!",
  });
}

module.exports = { createNewUser, loginUser };
