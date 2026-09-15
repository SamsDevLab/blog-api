const prisma = require("../lib/prisma");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (submittedEmail, submittedPassword, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: submittedEmail },
          });

          if (!user) {
            return done(null, false, { errorMessage: "Incorrect email" });
          }

          const match = await bcrypt.compare(submittedPassword, user.password);

          if (!match) {
            return done(null, false, { errorMessage: "Incorrect password" });
          }

          const { id, blogAuthor } = user;
          const targetedUser = { id, blogAuthor };

          return done(null, targetedUser);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
