async function createNewUser(req, res) {
  res.json({
    message: "Created new user!",
  });
}

async function editUser(req, res) {
  res.json({
    message: `Edited user ${req.params.userId}!`,
  });
}

async function deleteUser(req, res) {
  res.json({
    message: `Deleted user ${req.params.userId}!`,
  });
}

module.exports = { createNewUser, editUser, deleteUser };
