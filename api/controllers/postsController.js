const postsModel = require("../models/postsModel");
const commentsModel = require("../models/commentsModel");

async function getAllPosts(req, res) {
  const allPosts = await postsModel.queryAllPosts();

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
  const targetedPost = await postsModel.queryPost(postId);

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

async function addNewCommentToPost(req, res) {
  const updatedPost = await commentsModel.insertComment(req);

  res.json({
    updatedPost,
  });
}

async function updatePost(req, res) {
  const { content } = req.body;
  const { postId } = req.params;
  const updatePostData = { content, postId };

  const updatedPost = await postsModel.updatePost(updatePostData);

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
  getAllPosts,
  getAllPublishedPosts,
  getPost,
  createNewPost,
  addNewCommentToPost,
  updatePost,
  deletePost,
};
