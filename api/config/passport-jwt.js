const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const prisma = require("../lib/prisma.js");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      const id = jwtPayload.user;

      try {
        const user = await prisma.user.findUnique({
          where: { id },
        });

        if (user) {
          const { password, ...cleanUser } = user;
          return done(null, cleanUser);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
