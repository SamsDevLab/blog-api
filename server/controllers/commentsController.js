async function editComment(req, res) {
  const { commentId } = req.params;
}

async function deleteComment(req, res) {
  const { commentId } = req.params;
  console.log(`Delete comment ${commentId}!`);
}

module.exports = { editComment, deleteComment };
