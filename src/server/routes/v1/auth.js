const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const router = express.Router();
router.get("/start", (req, res) => {
  const { query } = req;
  query.instance_url = query.instance_url || "https://login.salesforce.com";
  const authorization = new Authorization(query.instance_url);
});

module.exports = router;
