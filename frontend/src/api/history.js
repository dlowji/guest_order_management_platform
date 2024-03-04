import http from "./http";

class HistoryApi {
  constructor() {
    this.request = http;
    this.url = "/history";
  }

  async getHistory(timestamp, filter = "day" | "month" | "year") {
    try {
      const response = await this.request.get(
        `${this.url}/${filter}/${timestamp}`
      );
      if (response.data.code === "SUCCESS") {
        return response.data;
      } else {
        return {
          code: response.data.error.code,
          message: response.data.error.message,
        };
      }
    } catch (error) {
      return {
        code: 400,
        message: "Can't get history",
      };
    }
  }
}

const historyApi = new HistoryApi();

export default historyApi;
