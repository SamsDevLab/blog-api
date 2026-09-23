const prisma = require("../lib/prisma");

async function queryPostsByAuthor(userId) {
  const allPostsByAuthor = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  return allPostsByAuthor;
}

async function queryAllPublishedPosts() {
  const allPublishedPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
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

async function updatePublishedStatus(req) {
  const id = req.body.post.id;
  const authorId = req.body.post.authorId;
  const userId = req.user.id;
  let published = req.body.post.published;

  published === true ? (published = false) : (published = true);

  if (userId === authorId) {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        published,
      },
    });

    const postsByAuthor = await queryPostsByAuthor(userId);

    return postsByAuthor;
  }
}

module.exports = {
  queryPostsByAuthor,
  queryAllPublishedPosts,
  queryPost,
  insertPost,
  updatePublishedStatus,
};
