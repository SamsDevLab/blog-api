const postsModel = require("../models/postsModel");
const prisma = require("../lib/prisma");

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

async function updateComment(editCommentData) {
  const { authorId, commentId, content } = editCommentData;

  const updatedComment = await prisma.comment.update({
    where: {
      authorId: +authorId,
      id: +commentId,
    },
    data: {
      content,
    },
  });

  return updatedComment;
}

async function deleteComment(deleteCommentData) {
  const { authorId, commentId } = deleteCommentData;

  const deletedComment = await prisma.comment.delete({
    where: {
      id: +commentId,
      authorId: +authorId,
    },
  });

  return deletedComment;
}

module.exports = { insertComment, updateComment, deleteComment };
