const prisma = require("../lib/prisma");

async function queryAllPosts() {
  const allPosts = await prisma.post.findMany();
  return allPosts;
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
      author: {
        select: {
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      comments: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  const postWithCurrentUser = { loggedInUserId, ...targetedPost };

  return postWithCurrentUser;
}

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

async function updatePost(updatePostData) {
  const { postId, content } = updatePostData;

  const updatedPost = await prisma.post.update({
    where: {
      id: +postId,
    },
    data: {
      content,
    },
  });

  return updatedPost;
}

async function deletePost(postId) {
  const deletedPost = await prisma.post.delete({
    where: {
      id: +postId,
    },
  });

  return deletedPost;
}

module.exports = {
  queryAllPosts,
  queryAllPublishedPosts,
  queryPost,
  insertPost,
  updatePost,
  deletePost,
};
