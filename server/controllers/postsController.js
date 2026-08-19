async function getAllPosts(req, res) {
  res.json({
    message: "return all posts!",
  });
}

async function getPost(req, res) {
  const postId = req.params.postId;
  res.json({
    message: `Get post ${postId}`,
  });
}

async function addNewPost(req, res) {
  res.json({
    message: "Added new post!",
  });
}

async function addNewCommentToPost(req, res) {
  res.json({
    message: "Adding new comment to post!",
  });
}

async function updatePost(req, res) {
  const postId = req.params.postId;
  res.json({
    message: `Updated post ${postId}!`,
  });
}

async function deletePost(req, res) {
  const postId = req.params.postId;
  res.json({
    message: `Delete post ${postId}`,
  });
}

module.exports = {
  getAllPosts,
  getPost,
  addNewPost,
  addNewCommentToPost,
  updatePost,
  deletePost,
};
