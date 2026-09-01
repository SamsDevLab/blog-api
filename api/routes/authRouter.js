const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const validateUserSignup = require("../middleware/validateUserSignup");
const jwt = require("jsonwebtoken");

router.post("/signup", validateUserSignup, authController.createNewUser);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (user === false) {
      const { errorMessage } = info;
      return res.status(400).json({ errorMessage });
    } else {
      jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
        return res.json({
          token,
        });
      });
    }
  })(req, res, next);
});

module.exports = router;
