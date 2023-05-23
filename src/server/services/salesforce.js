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
    console.log(
      "objectName",
      this.objectMap.has(objectName)
        ? this.objectMap.get(objectName)
        : objectName
    );
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
}

module.exports = Salesforce;
