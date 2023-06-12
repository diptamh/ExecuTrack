const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const jsforce = require("jsforce");
const Salesforce = require("../../services/salesforce");
const router = express.Router();

router.post("/automations", async (req, res) => {
  const token = req.user?.oauth?.accessToken.params;
  if (!token) {
    return res.status(401).send("Unauthorized");
  } else {
    const conn = new jsforce.Connection({
      accessToken: token.access_token,
      instanceUrl: token.instance_url,
      version: "54.0",
    });
    const salesforce = new Salesforce(conn);
    await salesforce.initMap();
    const validation = await salesforce.getValidationRules(req?.body?.name);
    console.log("validation->", validation);
    const beforeTrigger = await salesforce.getBeforeTrigger(req?.body?.name);
    console.log("beforeTrigger 1->", beforeTrigger);
    const beforeFlow = await salesforce.getBeforeFlow(req?.body?.name);
    console.log("beforeFlow 1->", beforeFlow);
    const duplicateRule = await salesforce.getDuplicateRules(req?.body?.name);
    console.log("duplicateRule 1->", duplicateRule);
    res.json({
      validation: validation,
      beforeTrigger: beforeTrigger,
      beforeFlow: beforeFlow,
      duplicateRule: duplicateRule,
    });
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
      version: "54.0",
    });

    const salesforce = new Salesforce(conn);
    res.json(await salesforce.getObjects());
  }
});

module.exports = router;
