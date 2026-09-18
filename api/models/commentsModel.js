const postsModel = require("../models/postsModel");
const prisma = require("../lib/prisma");

async function queryPostComments(req) {
  const postId = +req.params.postId;

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      post: {
        select: {
          authorId: true,
        },
      },
      author: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });

  const postComments = comments.map((comment) => {
    const currentLoggedInUser = req.user.id;
    return { ...comment, currentLoggedInUser };
  });

  return postComments;
}

async function insertComment(req) {
  const authorId = req.user.id;
  const postId = Number(req.params.postId);
  const { content } = req.body;

  await prisma.comment.create({
    data: {
      authorId,
      postId,
      content,
    },
  });

  const postComments = await queryPostComments(req);

  return postComments;
}

async function updateComment(req) {
  const commentId = +req.params.commentId;
  const editedComment = req.body.editedComment;

  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: editedComment,
    },
  });

  return updatedComment;
}

async function deleteComment(req) {
  const comment = req.body.comment;
  const commentId = comment.id;
  const commentAuthorId = comment.author.id;
  const postAuthorId = comment.post.authorId;
  const currentUserId = req.user.id;
  const isAdmin = req.body.isAdmin;

  if (
    (isAdmin === false && commentAuthorId === currentUserId) ||
    (isAdmin === true && postAuthorId === currentUserId)
  ) {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    const { postId } = deletedComment;
    const postComments = await prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return postComments;
  }
}

module.exports = {
  queryPostComments,
  insertComment,
  updateComment,
  deleteComment,
};
