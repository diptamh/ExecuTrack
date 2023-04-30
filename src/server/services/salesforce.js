import jsforce from "jsforce";

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
}

export default Salesforce;
