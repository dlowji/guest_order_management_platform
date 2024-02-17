import http from "./http";

class TableApi {
  constructor() {
    this.url = "/tables";
    this.request = http;
  }
  async getTables(statusQ) {
    const config = statusQ ? { params: { statusQ } } : {};

    const response = await this.request.get(`${this.url}`, config);
    return response.data;
  }
}

const tableApi = new TableApi();

export default tableApi;
