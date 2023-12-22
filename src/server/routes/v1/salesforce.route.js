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
    conn.object = req?.body?.name;
    const salesforce = new Salesforce(conn);
    await salesforce.initMap();

    const results = await Promise.all([
      salesforce.getValidationRules(), // 0
      salesforce.getAllTrigger(), // 1
      salesforce.getAllFlow(), // 2
      salesforce.getDuplicateRules(), // 3
      salesforce.getAssignmentRules(), // 4
      salesforce.getAutoResponseRules(), // 5
      salesforce.getWorkflowRules(), // 6
      salesforce.getEntitlementProcess(), // 7
      salesforce.getSharingRules(), // 8
      salesforce.getEscalationRules(), // 9
    ]);

    const validation = results[0];
    const allTrigger = results[1];
    const allFlow = results[2];
    const duplicateRule = results[3];
    const assignmentRule = results[4];
    const autoResponseRule = results[5];
    const workflowRules = results[6];
    const entitlementProcess = results[7];
    const sharingRules = results[8];
    const escalationRules = results[9];

    const beforeTrigger = {
      records: allTrigger.records.filter(
        (trigger) =>
          trigger.UsageBeforeDelete ||
          trigger.UsageBeforeUpdate ||
          trigger.UsageBeforeInsert
      ),
    };

    const beforeFlow = {
      records: allFlow.records.filter((flow) => {
        return flow.TriggerType == "RecordBeforeSave";
      }),
    };

    const afterTrigger = {
      records: allTrigger.records.filter(
        (trigger) =>
          trigger.UsageAfterDelete ||
          trigger.UsageAfterUpdate ||
          trigger.UsageAfterInsert ||
          trigger.UsageAfterUndelete
      ),
    };

    const afterFlow = {
      records: allFlow.records.filter(
        (flow) => flow.TriggerType == "RecordAfterSave"
      ),
    };

    res.json({
      validation: validation, // 2D
      beforeTrigger: beforeTrigger, // 3
      beforeFlow: beforeFlow, // 4
      duplicateRule: duplicateRule, // 6
      afterTrigger: afterTrigger, // 8
      assignmentRule: assignmentRule, // 9
      autoResponseRule: autoResponseRule, // 10
      workflowRules: workflowRules, // 11
      //12. Escalation Process
      afterFlow: afterFlow, // 14
      entitlementProcess: entitlementProcess, // 15
      escalationRules: escalationRules, //16
      sharingRules: sharingRules,
      // 16. Roll-Up Summary Fields on parent records
      // 17. Roll-Up Summary Fields on grand parent records
      // 18. Sharing Rules
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
