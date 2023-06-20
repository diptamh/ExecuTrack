class Salesforce {
  objectMap = new Map();

  constructor(conn) {
    // jsforce.Connection
    this.conn = conn;
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

  async query(query) {
    return await this.conn.query(query);
  }

  async getValidationRules(objectName) {
    console.log("objectName", objectName);
    return await this.conn.tooling.query(
      `SELECT Id, ValidationName, Active, Description, NamespacePrefix, 
        ManageableState, CreatedById, CreatedDate, LastModifiedById, 
        LastModifiedDate, EntityDefinitionId, ErrorDisplayField, ErrorMessage 
      FROM ValidationRule 
      WHERE EntityDefinitionId = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }'`
    );
  }

  async getObjects() {
    const objects = await this.conn.describeGlobal();
    // check if object is accessible , creatable, updateable, deletable
    return objects.sobjects.filter(
      (object) =>
        object.createable &&
        object.updateable &&
        object.deletable &&
        object.custom &&
        object.keyPrefix
    );
  }

  async getBeforeTrigger(objectName) {
    return await this.conn.tooling.query(
      `SELECT Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR TableEnumOrId = '${objectName}')  AND Status = 'Active'  AND (UsageBeforeDelete = true OR UsageBeforeUpdate = true OR UsageBeforeInsert = true)`
    );
  }

  async getAfterTrigger(objectName) {
    return await this.conn.tooling.query(
      `SELECT Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR TableEnumOrId = '${objectName}')  AND Status = 'Active'  AND (UsageAfterDelete = true OR UsageAfterUpdate = true OR UsageAfterInsert = true)`
    );
  }

  async getBeforeFlow(objectName) {
    return await this.conn.query(
      `SELECT ApiName,TriggerType,TriggerObjectOrEventId
      FROM FlowDefinitionView  
      WHERE (TriggerObjectOrEventId  = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR TriggerObjectOrEventId  = '${objectName}') AND TriggerType = 'RecordBeforeSave'`
    );
  }

  async getDuplicateRules(objectName) {
    return await this.conn.query(
      `SELECT SobjectType, DeveloperName,  MasterLabel, IsActive from DuplicateRule 
      WHERE SobjectType = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR SobjectType = '${objectName}'`
    );
  }

  async getAssignmentRules(objectName) {
    return await this.conn.query(
      `SELECT id,Name,SobjectType from AssignmentRule
      WHERE SobjectType = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR SobjectType = '${objectName}'`
    );
  }

  async getAutoResponseRules(objectName) {
    return await this.conn.tooling.query(
      `SELECT id,Name,EntityDefinitionId from AutoResponseRule
      WHERE EntityDefinitionId  = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR EntityDefinitionId  = '${objectName}'`
    );
  }

  async getWorkflowRules(objectName) {
    return await this.conn.tooling.query(
      `SELECT id,Name,TableEnumOrId from WorkflowRule
      WHERE TableEnumOrId  = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR TableEnumOrId  = '${objectName}'`
    );
  }

  // To do : Escalation Rules 12.

  // To do : Figure Out how to get the Executes flow automations in no perticular order 13

  async getAfterSaveTrigger(objectName) {
    return await this.conn.query(
      `SELECT Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
      FROM ApexTrigger
      WHERE (TableEnumOrId = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR TableEnumOrId = '${objectName}')  AND Status = 'Active'  AND (UsageAfterDelete = true OR UsageAfterUpdate = true OR UsageAfterInsert = true)`
    );
  }

  async getEntitlementProcess(objectName) {
    return await this.conn.query(
      `SELECT id,Name,SobjectType from SlaProcess
      WHERE SobjectType = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR SobjectType = '${objectName}'`
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
}

module.exports = Salesforce;
