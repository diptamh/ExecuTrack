const express = require("express");
const routes = require("./routes/v1");
const { errors } = require("celebrate");
const passport = require("./services/salesforce.strategy");
const session = require("express-session");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);
// use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("dist"));
app.use("/api/v1", routes);
app.use(errors());

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
