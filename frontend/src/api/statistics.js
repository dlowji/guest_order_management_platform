import http from "./http";
import statisticItemsDashboard from "../constants/StatisticItemsDashboard";
import { formatCurrency } from "../utils/formatCurrency";

class StatisticsApi {
  constructor() {
    this.request = http;
    this.url = "/statistics";
  }

  async getDashboardStatistics() {
    try {
      const response = await this.request.get(`${this.url}/home`);
      if (response.data.code === "SUCCESS") {
        const statistics = response.data.data;
        const newStatisticItems = statisticItemsDashboard.map((item) => {
          const value = statistics[item.id];
          if (item.id === "revenue") {
            return {
              ...item,
              value: formatCurrency(value),
            };
          }
          return {
            ...item,
            value: value.toString(),
          };
        });

        return {
          ...statistics,
          data: newStatisticItems,
        };
      } else {
        return {
          code: 400,
          message: "Can't get home",
        };
      }
    } catch (error) {
      return {
        code: 400,
        message: "Can't get home",
      };
    }
  }

  async getBestSeller(limit = 5) {
    try {
      const response = await this.request.get(
        `${this.url}/best-seller/${limit}`
      );
      if (response.data.code === "SUCCESS") {
        return response.data;
      } else {
        return {
          code: 400,
          message: "Can't get best seller",
        };
      }
    } catch (error) {
      return {
        code: 400,
        message: "Can't get best seller",
      };
    }
  }

  async getHistory(timestamp, filter = "day" | "month" | "year") {
    try {
      const response = await this.request.post(`${this.url}/filter`, {
        timestamp,
        filter,
      });
      if (response.data.code === 0) {
        const history = response?.data?.data || [];
        return {
          code: 200,
          data: history,
        };
      } else {
        return {
          code: 400,
          message: "Can't get history",
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

const statisticsApi = new StatisticsApi();

export default statisticsApi;
