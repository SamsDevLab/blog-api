const prisma = require("../lib/prisma");

async function addUser(newUserFields) {
  const newUser = await prisma.user.create({
    data: {
      email: newUserFields.email,
      username: newUserFields.username,
      blog_author: JSON.parse(newUserFields.blogAuthor),
    },
  });
  return newUser;
}

module.exports = { addUser };
