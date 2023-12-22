const express = require("express");

const standardRoutes = require("./salesforce.route");
const authRoutes = require("./auth.route");

const router = express.Router();
router.use("/auth", authRoutes);
router.get("/status", (req, res) => res.json({ status: "ok" }));
router.use("/salesforce", standardRoutes);
module.exports = router;
