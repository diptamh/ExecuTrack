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
    // return this.conn;
  }

  // this.map = new Map();

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

  // async getAllTrigger(objectName) {
  //   this.getAfterTriggerName = [];
  //   this.getBeforeTriggerName = [];
  //   const triggerData = await this.conn.tooling.query(
  //     `SELECT Name, UsageBeforeDelete, UsageBeforeUpdate, UsageBeforeInsert, UsageAfterDelete, UsageAfterUpdate, UsageAfterInsert, UsageAfterUndelete
  //     FROM ApexTrigger
  //     WHERE (TableEnumOrId = '${
  //       this.objectMap.has(objectName)
  //         ? this.objectMap.get(objectName)
  //         : objectName
  //     }' OR TableEnumOrId = '${objectName}')  AND Status = 'Active' `
  //   );
  //   const afterRecords = [];
  //   const beforeRecords = [];
  //   for (const trigger of triggerData.records) {
  //     if (
  //       trigger.UsageAfterDelete ||
  //       trigger.UsageAfterUpdate ||
  //       trigger.UsageAfterInsert ||
  //       trigger.UsageAfterUndelete
  //     ) {
  //       afterRecords.push(trigger);
  //     } else if (
  //       trigger.UsageBeforeDelete ||
  //       trigger.UsageBeforeUpdate ||
  //       trigger.UsageBeforeInsert
  //     ) {
  //       this.getBeforeTriggerName.push(trigger);
  //     }
  //   }
  // }

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
}

module.exports = Salesforce;
