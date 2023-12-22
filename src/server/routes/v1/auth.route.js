const express = require("express");
const passport = require("../../services/salesforce.strategy");

const router = express.Router();

router.get(
  "/callback",
  passport.authenticate("forcedotcom-prod", { failureRedirect: "/error" }),
  async (req, res) => {
    res.redirect("/home");
  }
);

router.get(
  "/callbacksb",
  passport.authenticate("forcedotcom-sandbox", { failureRedirect: "/error" }),
  async (req, res) => {
    res.redirect("/home");
  }
);

router.get("/session", (req, res) => {
  res.json(req.user || {});
});

router.get(
  "/production",
  passport.authenticate("forcedotcom-prod"),
  console.log
);
router.get(
  "/sandbox",
  passport.authenticate("forcedotcom-sandbox"),
  console.log
);
router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
