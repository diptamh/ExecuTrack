const express = require("express");
const passport = require("../../services/salesforce.strategy");

const router = express.Router();

router.get(
  "/callback",
  passport.authenticate("forcedotcom", { failureRedirect: "/error" }),
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

// /api/v1/auth/session
router.get("/session", (req, res) => {
  res.json(req.user || {});
});

module.exports = router;
