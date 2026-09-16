const router = require("express").Router();
const commentsController = require("../controllers/commentsController");
const passport = require("passport");

router.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  commentsController.getCommentsByPost,
);

router.patch(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.editComment,
);

router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.deleteCommentFromPost,
);

module.exports = router;
