class Salesforce {
  constructor(conn) {
    // jsforce.Connection
    this.conn = conn;
  }

  async query(query) {
    return await this.conn.query(query);
  }

  async getValidationRules(objectName) {
    return await this.conn.tooling.query(
      `SELECT Id, ValidationName, Active, Description, NamespacePrefix, 
        ManageableState, CreatedById, CreatedDate, LastModifiedById, 
        LastModifiedDate, EntityDefinitionId, ErrorDisplayField, ErrorMessage 
      FROM ValidationRule 
      WHERE EntityDefinitionId = '${objectName}'`
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
