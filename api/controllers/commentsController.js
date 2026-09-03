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
  const commentId = +req.params.commentId;
  const { authorId } = req.body;
  const loggedInUserId = req.user.id;

  if (loggedInUserId === authorId) {
    const updatedPost = await commentsModel.deleteComment(commentId, req);
    res.json({ updatedPost });
  } else {
    res.json("User unauthorized to delete this comment");
  }
}

module.exports = { editComment, deleteComment };
