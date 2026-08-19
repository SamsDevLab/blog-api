const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.createNewUser);
router.post("/login", authController.loginUser);

module.exports = router;
