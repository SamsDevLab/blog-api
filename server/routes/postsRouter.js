const router = require("express").Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getAllPosts); //done
router.get("/published", postsController.getAllPublishedPosts);
router.get("/:postId", postsController.getPost); // done

router.post("/", postsController.createNewPost); // needs a middleware to verify if the user is a blog author or not. if not, this will be rejected
router.post("/:postId/comments", postsController.addNewCommentToPost); // req.user will be a part of this. You'll be utilizing the username of the req.user to get the commenting users id so it can be placed within 'authorId' in the comment. A form submission on the blog post will send the postID to the backend so it knows which post to associate with the comment

router.patch("/:postId", postsController.updatePost); // This option should ONLY be available on the frontend if the req.user's ID is associated with the authorID of the post

router.delete("/:postId", postsController.deletePost); // This option should ONLY be available on the frontend if the req.user's ID is associated with the authorID of the post

module.exports = router;
