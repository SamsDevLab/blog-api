const router = require("express").Router();
const commentsController = require("../controllers/commentsController");

router.patch("/:commentId", commentsController.editComment); // The userID sending this request will be extracted in the JWT token. Then, the model must use that Id to query the database and check to see if that userID actually WROTE that comment. This would mean they have the right to edit it.

// Same thing will need to happen in posts. And the userID's blog_author status will have to be checked when creating a post to ensure that user actually has the credentials to write a post

router.delete("/:commentId", commentsController.deleteComment);

module.exports = router;
