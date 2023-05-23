const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const jsforce = require("jsforce");
const Salesforce = require("../../services/salesforce");

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
    const salesforce = new Salesforce(conn);
    await salesforce.initMap();
    const validation = await salesforce.getValidationRules(req?.query?.name);
    res.json(validation);
    // console.log("result", result);
    // .getValidationRules(req?.query?.name)
    // .then((result) => {
    //   res.json(result);
    // });
  }
});

router.get("/objects", async (req, res) => {
  const token = req.user?.oauth?.accessToken.params;
  if (!token) {
    return res.status(401).send("Unauthorized");
  } else {
    const conn = new jsforce.Connection({
      accessToken: token.access_token,
      instanceUrl: token.instance_url,
    });

    const salesforce = new Salesforce(conn);
    res.json(await salesforce.getObjects());
  }
});

module.exports = router;
