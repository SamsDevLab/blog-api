const prisma = require("../lib/prisma");

async function addUser(req, res) {
  const newUser = await prisma.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
    },
  });
  return newUser;
}

module.exports = { addUser };
