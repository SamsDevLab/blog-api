const prisma = require("../lib/prisma");

async function queryPostsByAuthor(userId) {
  const allPostsByAuthor = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });

  return allPostsByAuthor;
}

async function queryAllPublishedPosts() {
  const allPublishedPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  return allPublishedPosts;
}

async function queryPost(postId, req) {
  const loggedInUserId = req.user.id;
  const targetedPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      title: true,
      content: true,
      id: true,
      authorId: true,
      author: {
        select: {
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  const postWithCurrentUser = { loggedInUserId, ...targetedPost };

  return postWithCurrentUser;
}

async function insertPost(req) {
  const { title, content } = req.body.newPostContent;
  const { id, blogAuthor } = req.user;

  if (blogAuthor === true) {
    const newPost = await prisma.post.create({
      data: {
        authorId: +id,
        title: title,
        content: content,
      },
    });

    return newPost;
  }
}

module.exports = {
  queryPostsByAuthor,
  queryAllPublishedPosts,
  queryPost,
  insertPost,
};
