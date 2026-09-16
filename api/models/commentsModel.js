const postsModel = require("../models/postsModel");
const prisma = require("../lib/prisma");

async function queryPostComments(req) {
  const postId = +req.params.postId;

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

  const updatedPost = await postsModel.queryPost(postId, req);

  return updatedPost;
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
  const commentId = +req.params.commentId;
  console.log(req.params);

  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  if (req.body.isAdmin) {
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
    console.log(postComments);
    return postComments;
  } else {
    const { postId } = deletedComment;
    const updatedPost = await postsModel.queryPost(postId, req);
    return updatedPost;
  }
}

module.exports = {
  queryPostComments,
  insertComment,
  updateComment,
  deleteComment,
};
