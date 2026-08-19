const router = require("express").Router();
const commentsController = require("../controllers/commentsController");

router.put("/:commentId", commentsController.editComment);

router.delete("/:commentId", commentsController.deleteComment);

module.exports = router;
