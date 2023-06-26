class Salesforce {
  objectMap = new Map();

  constructor(conn) {
    // jsforce.Connection
    this.conn = conn;

    // const customObj =await this.conn.tooling.query(
    //   "SELECT Id,DeveloperName FROM CustomObject"
    // );

    // customObj.records.forEach((obj) => {
    //   // this.map.put
    //   this.objectMap.set(
    //     obj.DeveloperName.concat("__c"),
    //     obj.Id.substring(0, 15)
    //   );
    // });
  }

  async initMap() {
    (
      await this.conn.tooling.query("SELECT Id,DeveloperName FROM CustomObject")
    ).records.forEach((obj) => {
      // this.map.put
      this.objectMap.set(
        obj.DeveloperName.concat("__c"),
        obj.Id.substring(0, 15)
      );
    });
  }

  async getValidationRules() {
    console.log("getValidationRules->", this.conn.object);
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
        object.deletable &&
        object.custom &&
        object.keyPrefix
    );
  }

  async getAllTrigger() {
    return await this.conn.tooling.query(
      `SELECT Name, Status, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
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
      `SELECT ApiName,TriggerType,TriggerObjectOrEventId
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
      `SELECT Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TableEnumOrId = '${
        this.conn.object
      }')  AND Status = 'Active'  AND (UsageBeforeDelete = true OR UsageBeforeUpdate = true OR UsageBeforeInsert = true)`
    );
  }

  async getAfterTrigger() {
    return await this.conn.tooling.query(
      `SELECT Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
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
      `SELECT ApiName,TriggerType,TriggerObjectOrEventId
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
      `SELECT SobjectType, DeveloperName,  MasterLabel, IsActive from DuplicateRule 
      WHERE SobjectType = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR SobjectType = '${this.conn.object}'`
    );
  }

  async getAssignmentRules() {
    return await this.conn.query(
      `SELECT id,Name,SobjectType from AssignmentRule
      WHERE SobjectType = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR SobjectType = '${this.conn.object}'`
    );
  }

  async getAutoResponseRules() {
    return await this.conn.tooling.query(
      `SELECT id,Name,EntityDefinitionId from AutoResponseRule
      WHERE EntityDefinitionId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR EntityDefinitionId  = '${this.conn.object}'`
    );
  }

  async getWorkflowRules() {
    return await this.conn.tooling.query(
      `SELECT id,Name,TableEnumOrId from WorkflowRule
      WHERE TableEnumOrId  = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR TableEnumOrId  = '${this.conn.object}'`
    );
  }

  // To do : Escalation Rules 12.

  // To do : Figure Out how to get the Executes flow automations in no perticular order 13

  async getAfterFlow() {
    return await this.conn.query(
      `SELECT ApiName,TriggerType,TriggerObjectOrEventId
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

  async getEntitlementProcess() {
    return await this.conn.query(
      `SELECT id,Name,SobjectType from SlaProcess
      WHERE SobjectType = '${
        this.objectMap.has(this.conn.object)
          ? this.objectMap.get(this.conn.object)
          : this.conn.object
      }' OR SobjectType = '${this.conn.object}'`
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

  async getSharingRules() {
    // console.log("getSharingRules->", await this.conn.describe(objectName));
    return await this.conn.describe(this.conn.object);
  }
}

module.exports = Salesforce;
