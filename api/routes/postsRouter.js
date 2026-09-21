const router = require("express").Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.getPostsByAuthor,
);
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

router.post(
  "/addPost",
  passport.authenticate("jwt", { session: false }),
  postsController.addPost,
);

module.exports = router;
