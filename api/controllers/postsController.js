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

async function createNewPost(req, res) {
  const { authorId, content, title } = req.body;
  const newPostData = { authorId, content, title };

  const newPost = await postsModel.insertPost(newPostData);

  res.json({
    newPost,
  });
}

async function updatePost(req, res) {
  const dataForUpdate = req.body;
  const { postId } = req.params;

  const updatedPost = await postsModel.updatePost(dataForUpdate, postId);

  res.json({
    updatedPost,
  });
}

async function deletePost(req, res) {
  const postId = req.params.postId;

  const deletedPost = await postsModel.deletePost(postId);

  res.json({
    message: "This post was deleted!",
    post: deletedPost,
  });
}

module.exports = {
  getPostsByAuthor,
  getAllPublishedPosts,
  getPost,
  createNewPost,
  updatePost,
  deletePost,
};
