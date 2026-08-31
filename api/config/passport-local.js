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
            return done(null, false, { message: "Incorrect email" });
          }

          const match = await bcrypt.compare(submittedPassword, user.password);

          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          }

          const { id } = user;

          return done(null, id);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
