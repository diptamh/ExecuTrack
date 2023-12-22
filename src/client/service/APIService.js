import * as React from "react";
import axios from "axios";

class APIService extends React.Component {
  constructor() {
    super();
  }

  async getAllAutomation(selectedObject) {
    const dataJSON = {
      name: selectedObject,
    };
    const data = await this.requestHandler(
      "POST",
      `/api/v1/salesforce/automations`,
      dataJSON
    );
    return data;
  }

  async getObjects() {
    const data = await this.requestHandler("GET", `/api/v1/salesforce/objects`);
    return data;
  }

  requestHandler = async (method, url, data) => {
    const record = await axios({
      method,
      url,
      data,
    });
    return record;
  };
}

export default new APIService();
