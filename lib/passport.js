import passport from "passport";
import LocalStrategy from "passport-local";
import { findUserByEmail, validatePassword } from "lib/db";

passport.serializeUser(function (user, done) {
  console.log("serialize user");
  // serialize the username into session
  done(null, user.email);
});

passport.deserializeUser(async function (id, done) {
  console.log("deserializeUser");
  // deserialize the username back into user object
  const user = await findUserByEmail(id);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (email, password, done) => {
      const user = await findUserByEmail(email);
      if (!user || !validatePassword(user, password)) {
        done(null, null);
      } else {
        done(null, user);
      }
    }
  )
);

export default passport;
