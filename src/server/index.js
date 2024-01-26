const express = require("express");
const routes = require("./routes/v1");
const { errors } = require("celebrate");
const passport = require("./services/salesforce.strategy");
const session = require("express-session");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");

// Load environment variables
require("dotenv").config();

// Create the Express app
const app = express();

// Configure session
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

// use passport
app.use(passport.initialize());
app.use(passport.session());

// Set up middleware
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use("/api/v1", routes);
app.use(errors());

// Serve static files
app.get("/", (req, res) => res.redirect("http://localhost:3000"));
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));

// setup Logout
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

// Start the server
app.listen(process.env.PORT || 8080, () =>
  console.log(`✅ listening on port ${process.env.PORT || 8080}!`)
);
