const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.post("/signup", authController.createNewUser);
router.post("/login", (req, res) => {
  // This is going to include Pag
  res.json({
    message: "User is logged in",
  });
});

module.exports = router;
