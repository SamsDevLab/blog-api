const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

async function addUser(newUserData) {
  const { email, username, password } = newUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });

  return newUser;
}

module.exports = { addUser };
