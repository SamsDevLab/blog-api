const router = require("express").Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

router.get("/", postsController.getAllPosts);
router.get(
  "/published",
  passport.authenticate("jwt", { session: false }),
  postsController.getAllPublishedPosts,
);
router.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postsController.getPost,
);

router.post("/", postsController.createNewPost); // needs a middleware to verify if the user is a blog author or not. if not, this will be rejected
router.post(
  "/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  postsController.addNewCommentToPost,
);

router.patch("/:postId", postsController.updatePost); // This option should ONLY be available on the frontend if the req.user's ID is associated with the authorID of the post

router.delete("/:postId", postsController.deletePost); // This option should ONLY be available on the frontend if the req.user's ID is associated with the authorID of the post

module.exports = router;
