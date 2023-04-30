import passport from "passport";
import { Strategy as ForceDotComStrategy } from "passport-forcedotcom";

passport.use(
  new ForceDotComStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope: ["id", "chatter_api", "api"],
      callbackURL: `/api/v1/auth/callback`,
      authorizationURL: process.env.SF_AUTHORIZATION_URL,
      tokenURL: process.env.TOKEN_URL,
    },
    function verify(token, refreshToken, profile, done) {
      profile.oauth = {
        refreshToken,
        accessToken: token,
      };
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

export default passport;
