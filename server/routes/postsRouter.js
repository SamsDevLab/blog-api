const router = require("express").Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getAllPosts);
router.get("/:postId", postsController.getPost);

router.post("/", postsController.addNewPost);
router.post("/:postId/comments/", postsController.addNewCommentToPost);

router.put("/:postId", postsController.updatePost);

router.delete("/:postId", postsController.deletePost);

module.exports = router;
