import http from "./http";

class OrderApi {
  constructor() {
    this.request = http;
    this.url = "/orders";
  }

  async placeTableOrder(tableId, userId) {
    try {
      const response = await this.request.post(`${this.url}`, {
        tableId,
        userId,
      });

      console.log({ response });
    } catch (error) {
      return error.response;
    }
  }
}

const orderApi = new OrderApi();

export default orderApi;
