const commentsModel = require("../models/commentsModel");

async function getCommentsByPost(req, res) {
  const postComments = await commentsModel.queryPostComments(req);

  res.json({
    postComments,
  });
}

async function addNewCommentToPost(req, res) {
  const postComments = await commentsModel.insertComment(req);

  res.json({
    postComments,
  });
}

async function editComment(req, res) {
  const updatedComment = await commentsModel.updateComment(req);

  res.json({
    updatedComment,
  });
}

async function deleteCommentFromPost(req, res) {
  const postComments = await commentsModel.deleteComment(req);

  res.json({
    postComments,
  });
}

module.exports = {
  getCommentsByPost,
  addNewCommentToPost,
  editComment,
  deleteCommentFromPost,
};
