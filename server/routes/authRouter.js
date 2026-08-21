const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const validateUserSignup = require("../middleware/validateUserSignup");

router.post("/signup", validateUserSignup, authController.createNewUser);
router.post("/login", (req, res) => {
  // This is going to include Pag
  res.json({
    message: "User is logged in",
  });
});

module.exports = router;
