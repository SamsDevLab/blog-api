const prisma = require("../lib/prisma");

async function insertComment(newCommentData) {
  const { authorId, content, postId } = newCommentData;

  const newComment = await prisma.comment.create({
    data: {
      authorId: +authorId,
      content,
      postId: +postId,
    },
  });

  return newComment;
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
