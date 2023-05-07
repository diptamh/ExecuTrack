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
    secret: "my rsm sfdc",
  })
);
// use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("dist"));
app.use("/api/v1", routes);
app.use(errors());

app.get("/auth/forcedotcom", passport.authenticate("forcedotcom"), console.log);
app.get(
  "/auth/forcedotcom/sandbox",
  passport.authenticate("forcedotcom-sandbox"),
  console.log
);

app.post("/auth/forcedotcom/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ success: true });
  });
});

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
});

// need this for react router to work
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));

app.listen(process.env.PORT || 8080, () =>
  console.log(`✅ listening on port ${process.env.PORT || 8080}!`)
);
