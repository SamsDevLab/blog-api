const postsModel = require("../models/postsModel");

async function getPostsByAuthor(req, res) {
  const userId = req.user.id;
  const allPosts = await postsModel.queryPostsByAuthor(userId);

  res.json({
    allPosts,
  });
}

async function getAllPublishedPosts(req, res) {
  const allPublishedPosts = await postsModel.queryAllPublishedPosts();

  res.json({
    allPublishedPosts,
  });
}

async function getPost(req, res) {
  const postId = +req.params.postId;
  const targetedPost = await postsModel.queryPost(postId, req);

  res.json({
    targetedPost,
  });
}

async function addPost(req, res) {
  const newPost = await postsModel.insertPost(req);

  res.json({
    newPost,
  });
}

async function updatePublishedStatus(req, res) {
  const postsByAuthor = await postsModel.updatePublishedStatus(req);

  res.json({
    postsByAuthor,
  });
}

module.exports = {
  getPostsByAuthor,
  getAllPublishedPosts,
  getPost,
  addPost,
  updatePublishedStatus,
};
