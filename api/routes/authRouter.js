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
      const userId = user.id;
      jwt.sign({ userId }, process.env.SECRET_KEY, (err, token) => {
        return res.json({
          token,
        });
      });
    }
  })(req, res, next);
});

router.post("/admin/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (user === false) {
      const { errorMessage } = info;
      return res.status(400).json({ errorMessage });
    } else if (user.blogAuthor === false) {
      return res.status(403).json({
        errorMessage:
          "Access Denied: You do not have permission to view this page.",
      });
    } else {
      const userId = user.id;
      jwt.sign({ userId }, process.env.SECRET_KEY, (err, token) => {
        return res.json({
          token,
        });
      });
    }
  })(req, res, next);
});

module.exports = router;
