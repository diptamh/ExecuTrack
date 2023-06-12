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

  async getBeforeTrigger(objectName) {
    return await this.conn.tooling.query(
      `SELECT Name
      FROM ApexTrigger 
      WHERE (TableEnumOrId = '${
        this.objectMap.has(objectName)
          ? this.objectMap.get(objectName)
          : objectName
      }' OR TableEnumOrId = '${objectName}') AND (UsageBeforeDelete = true OR UsageBeforeUpdate  = true OR UsageBeforeInsert = true) AND Status = 'Active' `
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
