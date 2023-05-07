const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const jsforce = require("jsforce");

const router = express.Router();

// /api/v1/salesforce/query
// just a example query on how jsforce can be leveraged
router.get("/query", async (req, res) => {
  const token = req.user?.oauth?.accessToken.params;
  if (!token) {
    return res.status(401).send("Unauthorized");
  } else {
    const conn = new jsforce.Connection({
      accessToken: token.access_token,
      instanceUrl: token.instance_url,
    });

    res.json(await conn.query("SELECT Id, Name FROM Account LIMIT 10"));
  }
});

module.exports = router;
