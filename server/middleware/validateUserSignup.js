const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateUserSignup = [
  body("email")
    .trim()
    .isLength(1)
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("username")
    .trim()
    .isLength(1)
    .withMessage("Username cannot be empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  body("password")
    .trim()
    .isLength(1)
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password.");
    }
    return true;
  }),
  handleValidationErrors,
];

module.exports = validateUserSignup;
