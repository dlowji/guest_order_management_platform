import http from "./http";

class TableApi {
  constructor() {
    this.url = "/tables";
    this.request = http;
  }
  async getTables(statusQ) {
    const config = statusQ ? { params: { statusQ } } : {};

    const response = await this.request.get(`${this.url}`, config);
    if (response.data.code === "SUCCESS") {
      return response.data.data;
    } else {
      console.log("Error: ", response.data);
    }
  }
}

const tableApi = new TableApi();

export default tableApi;
