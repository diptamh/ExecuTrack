const passport = require("passport");
const ForceDotComStrategy = require("passport-forcedotcom").Strategy;
require("dotenv").config();
const supabase = require("../services/supabase");

passport.use(
  "forcedotcom-prod",
  new ForceDotComStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope: ["id", "chatter_api", "api"],
      callbackURL: `/api/v1/auth/callback`,
      authorizationURL: process.env.PRODUCTION_AUTHORIZATION_URL,
      tokenURL: process.env.PRODUCTION_TOKEN_URL,
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

passport.use(
  "forcedotcom-sandbox",
  new ForceDotComStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope: ["id", "chatter_api", "api"],
      callbackURL: `/api/v1/auth/callbacksb`,
      authorizationURL: process.env.SANDBOX_AUTHORIZATION_URL,
      tokenURL: process.env.SANDBOX_TOKEN_URL,
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

passport.serializeUser(async function (user, done) {
  const instanceUrl = user._raw.urls.rest.split("/services/data")[0];
  console.log("user--->", user);
  const supaUser = {
    user_id: user.id,
    username: user._raw.username,
    organization_id: user._raw.organization_id,
    email: user._raw.email,
    name: user.displayName,
    instance_url: instanceUrl,
    mobile_phone: user._raw.mobile_phone,
  };

  const { data, error } = await supabase
    .from("supaUser")
    .upsert(supaUser, { onConflict: "user_id" })
    .select();

  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;
