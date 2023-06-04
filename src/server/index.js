const express = require("express");
const routes = require("./routes/v1");
const { errors } = require("celebrate");
const passport = require("./services/salesforce.strategy");
const session = require("express-session");
require("dotenv").config();
const path = require("path");
const meteredMiddleware = require("./middleware/metered.js");
const bodyParser = require("body-parser");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(meteredMiddleware.handle);
// use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("dist"));
app.use("/api/v1", routes);
app.use(errors());

// need this for holding the session for /home
app.get("/home", passport.authenticate("session"), function (req, res, next) {
  /* ... */
});

app.get("/logout", function (req, res) {
  // To do - need to redirect to the logout page
  req.logout();
  res.redirect("/");
});

app.post("/auth/forcedotcom/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ success: true });
  });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`✅ listening on port ${process.env.PORT || 8080}!`)
);
