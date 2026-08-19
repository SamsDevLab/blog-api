const prisma = require("../lib/prisma");

async function insertPost(newPostData) {
  const { authorId, title, content } = newPostData;

  const newPost = await prisma.post.create({
    data: {
      authorId: +authorId,
      title: title,
      content: content,
    },
  });

  return newPost;
}

module.exports = { insertPost };
