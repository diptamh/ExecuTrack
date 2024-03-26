const AdmZip = require("adm-zip");
const parser = require("xml2js").parseString;

class Salesforce {
  objectMap = new Map();

  constructor(conn) {
    this.conn = conn;
  }

  async initMap() {
    (
      await this.conn.tooling.query("SELECT Id,DeveloperName FROM CustomObject")
    ).records.forEach((obj) => {
      this.objectMap.set(
        obj.DeveloperName.concat("__c"),
        obj.Id.substring(0, 15)
      );
    });
  }

  async getValidationRules() {
    return await this.conn.tooling.query(
      `SELECT Id, ValidationName, Active, Description, NamespacePrefix, 
        ManageableState, CreatedById, CreatedDate, LastModifiedById, 
        LastModifiedDate, EntityDefinitionId, ErrorDisplayField, ErrorMessage 
      FROM ValidationRule 
      WHERE EntityDefinitionId = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }'`
    );
  }

  async getObjects() {
    const objects = await this.conn.describeGlobal();
    return objects.sobjects.filter(
      (object) =>
        object.createable &&
        object.updateable &&
        // object.deletable &&
        // object.custom &&
        object.keyPrefix
    );
  }

  async getAllTrigger() {
    return await this.conn.tooling.query(
      `SELECT Id, Name, Status, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object) // 15
          : this.conn.object
      }' OR TableEnumOrId = '${this.conn.object}')`
    );
  }

  async getAllFlow() {
    return await this.conn.query(
      `SELECT Id, ApiName,TriggerType,TriggerObjectOrEventId,IsActive
      FROM FlowDefinitionView  
      WHERE (TriggerObjectOrEventId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TriggerObjectOrEventId  = '${this.conn.object}')`
    );
  }

  async getBeforeTrigger() {
    return await this.conn.tooling.query(
      `SELECT Id, Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete,Status
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TableEnumOrId = '${
        this.conn.object
      }')  AND (UsageBeforeDelete = true OR UsageBeforeUpdate = true OR UsageBeforeInsert = true)`
    );
  }

  async getAfterTrigger() {
    return await this.conn.tooling.query(
      `SELECT Id, Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete, Status
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TableEnumOrId = '${
        this.conn.object
      }')  AND Status = 'Active'  AND (UsageAfterDelete = true OR UsageAfterUpdate = true OR UsageAfterInsert = true)`
    );
  }

  async getBeforeFlow() {
    return await this.conn.query(
      `SELECT Id, ApiName,TriggerType,TriggerObjectOrEventId,IsActive
      FROM FlowDefinitionView  
      WHERE (TriggerObjectOrEventId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TriggerObjectOrEventId  = '${
        this.conn.object
      }') AND TriggerType = 'RecordBeforeSave'`
    );
  }

  async getDuplicateRules() {
    return await this.conn.query(
      `SELECT Id, SobjectType, DeveloperName,  MasterLabel, IsActive from DuplicateRule 
      WHERE SobjectType = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR SobjectType = '${this.conn.object}'`
    );
  }

  /**
   *
   * @TODO: Need to check this with case
   */
  async getAssignmentRules() {
    return await this.conn.query(
      `SELECT Id,Name,SobjectType,Active from AssignmentRule
      WHERE SobjectType = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR SobjectType = '${this.conn.object}'`
    );
  }

  /**
   *
   * @TODO: Need to check this with case
   */
  async getAutoResponseRules() {
    return await this.conn.tooling.query(
      `SELECT Id,Name,EntityDefinitionId,Active from AutoResponseRule
      WHERE EntityDefinitionId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR EntityDefinitionId  = '${this.conn.object}'`
    );
  }

  async getWorkflowRules() {
    return await this.conn.tooling.query(
      `SELECT Id,Name,TableEnumOrId from WorkflowRule
      WHERE TableEnumOrId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TableEnumOrId  = '${this.conn.object}'`
    );
  }

  // To do : Figure Out how to get the Executes flow automations in no perticular order 13

  async getAfterFlow() {
    return await this.conn.query(
      `SELECT Id,ApiName,TriggerType,TriggerObjectOrEventId,IsActive
      FROM FlowDefinitionView  
      WHERE (TriggerObjectOrEventId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TriggerObjectOrEventId  = '${
        this.conn.object
      }') AND TriggerType = 'RecordAfterSave'`
    );
  }

  // async calculateRollupSummary(objectName) {
  //   return await this.conn.query(
  //     `SELECT id,Name,SobjectType from RollupSummaryField
  //     WHERE SobjectType = '${
  //       this.objectMap.has(objectName)
  //         ? this.objectMap.get(objectName)
  //         : objectName
  //     }' OR SobjectType = '${objectName}'`
  //   );
  // }

  // To do : Figure Oyut how to get the Roll up Summary Fields in no perticular order 17

  // Retrive Sharing Rules -> https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_retrieve.htm

  async extractPackage() {
    let retrieveRes = await this.conn.metadata.retrieve({
      unpackaged: {
        types: [
          { name: "EscalationRules", members: "*" },
          { name: "SharingRules", members: "*" },
          { name: "EntitlementProcess", members: "*" },
        ],
        version: "57.0",
      },
    });
    while (true) {
      if (retrieveRes.done === true || retrieveRes.done === "true") break;
      await this.sleep(5000);
      console.log("checking...");
      retrieveRes = await this.conn.metadata.checkRetrieveStatus(
        retrieveRes.id
      );
      console.log("check done");
    }

    const zip = new AdmZip(Buffer.from(retrieveRes.zipFile, "base64"));
    const zipEntries = zip.getEntries();

    let escalationRules = [],
      entitlementProcess = [],
      sharingRules = [];
    zipEntries.forEach((entry) => {
      if (
        entry.entryName.endsWith("escalationRules") &&
        (entry.entryName.split(".")[0].split("/")[2] ===
          this.objectMap?.get(this.conn.object) ||
          entry.entryName.split(".")[0].split("/")[2] === this.conn.object)
      ) {
        const fileContent = entry.getData().toString("utf8");
        // Parse the XML content
        parser(fileContent, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
            return;
          }

          // Access the fullName value
          for (const key in result?.EscalationRules?.escalationRule) {
            if (result?.EscalationRules?.escalationRule[key].active == "true") {
              escalationRules.push(
                result?.EscalationRules?.escalationRule[key].fullName[0]
              );
            }
          }
        });
      } else if (
        entry.entryName.endsWith("entitlementProcess") &&
        (this.objectMap?.get(this.conn.object) === "Case" ||
          this.conn.object === "Case")
      ) {
        // Define a regular expression pattern to match the desired substring
        const pattern = /entitlementProcesses\/(.*?)\.entitlementProcess/;
        // Use RegExp.prototype.exec() to find the first occurrence of the pattern in the input string
        const match = pattern.exec(entry.entryName);
        entitlementProcess.push(match[1]);
      } else if (
        entry.entryName.endsWith("sharingRules") &&
        (entry.entryName.split(".")[0].split("/")[2] ===
          this.objectMap?.get(this.conn.object) ||
          entry.entryName.split(".")[0].split("/")[2] === this.conn.object)
      ) {
        const fileContent = entry.getData().toString("utf8");
        // Parse the XML content
        parser(fileContent, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
            return;
          }

          // Access the fullName value
          for (const key in result?.SharingRules?.sharingOwnerRules) {
            if (result?.SharingRules?.sharingOwnerRules[key]) {
              sharingRules.push(
                result?.SharingRules?.sharingOwnerRules[key].label[0]
              );
            }
          }
        });
      }
    });
    return [escalationRules, entitlementProcess, sharingRules];
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = Salesforce;
