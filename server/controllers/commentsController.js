const commentsModel = require("../models/commentsModel");

async function editComment(req, res) {
  const { content, authorId } = req.body;
  const { commentId } = req.params;
  const editCommentData = { authorId, commentId, content };

  const updatedComment = await commentsModel.updateComment(editCommentData);

  res.json({
    updatedComment,
  });
}

async function deleteComment(req, res) {
  const { authorId } = req.body;
  const { commentId } = req.params;
  const deleteCommentData = { authorId, commentId };

  const deletedComment = await commentsModel.deleteComment(deleteCommentData);

  res.json({
    deletedComment,
  });
}

module.exports = { editComment, deleteComment };
