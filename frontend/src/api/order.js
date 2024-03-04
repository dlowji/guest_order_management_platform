import http from "./http";
import { formatCurrency } from "../utils/formatCurrency";
import statisticItemsDashboard from "../constants/StatisticItemsDashboard";

class OrderApi {
  constructor() {
    this.request = http;
    this.url = "/orders";
  }

  async createOrder(userId, tableId) {
    try {
      const response = await this.request.post(`${this.url}`, {
        userId,
        tableId,
      });

      if (response.data.error) {
        return {
          code: response.data.error.code,
          message: response.data.error.message,
        };
      } else if (response.data?.code === "SUCCESS") {
        return response.data;
      }
      return {};
    } catch (error) {
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: "Can't create order due to an internal server error",
      };
    }
  }

  async getOrders(status) {
    try {
      console.log(status);
      const response = await this.request.get(
        status ? `${this.url}?statusQ=${status}` : `${this.url}`
      );
      console.log(response);
      if (response.data.error) {
        return {
          code: response.data.error.code,
          message: response.data.error.message,
        };
      } else if (response.data?.code === "SUCCESS") {
        return response.data;
      }
      return {};
    } catch (error) {
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      };
    }
  }

  async getOrderById(orderId) {
    if (!orderId)
      return {
        code: "BAD_REQUEST",
        message: "Invalid order id",
      };
    try {
      const response = await this.request.get(`${this.url}/${orderId}`);
      console.log(response);
      if (response.data.error) {
        return {
          code: response.data.error.code,
          message: response.data.error.message,
        };
      } else if (response.data?.code === "SUCCESS") {
        return response.data;
      }

      return {};
    } catch (error) {
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      };
    }
  }

  async getCreatedAndProcessingOrderByProperties(userId, tableId) {
    try {
      const response = await this.request.get(
        `${this.url}/?userId=${userId}&tableId=${tableId}&statusQ=CREATED&statusQ=IN_PROCESSING`
      );
      if (response.data.error) {
        return {
          code: response.data.error.code,
          message: response.data.error.message,
        };
      } else if (
        response.data.code === "SUCCESS" &&
        response.data.data.length === 1
      ) {
        return response.data;
      }
      return {};
    } catch (error) {
      return {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      };
    }
  }

  async updateOrderedLineItems(orderId, items) {
    if (!orderId || !items || items.length === 0) {
      return {
        code: 400,
        message: "Can't create order line items",
      };
    }
    try {
      console.log([...items]);
      const response = await this.request.post(`${this.url}/placed`, {
        orderId,
        orderedLineItems: items.map((item) => {
          const formattedItem = {
            dishId: item.dishId,
            quantity: item.quantity,
            note: item.note === "" ? "Nothing" : item.note,
          };

          if (item.lineItemId) {
            formattedItem.lineItemId = item.lineItemId;
          }

          return formattedItem;
        }),
      });

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
        message: "Can't create order line items",
      };
    }
  }

  async progressOrder(orderId, items) {
    if (!orderId) {
      return {
        code: 400,
        message: "Can't progress order",
      };
    }
    try {
      const response = await this.request.post(`${this.url}/progress`, {
        orderId,
        progressLineItems: items.map((item) => {
          return {
            lineItemId: item._id,
            quantity: item.quantity,
            status: item.status,
          };
        }),
      });

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
        message: "Can't progress order",
      };
    }
  }

  async getDashboardStatistics() {
    try {
      const response = await this.request.get(`${this.url}/home`);
      if (response.data.code === 0) {
        const statistics = response.data;
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
          code: 200,
          data: newStatisticItems || [],
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

  async checkoutOrder(orderId) {
    if (!orderId) {
      return {
        code: 400,
        message: "Can't checkout order",
      };
    }
    try {
      const response = await this.request.post(`${this.url}/checkout`, {
        orderId,
      });

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
        message: "Can't checkout order",
      };
    }
  }
}

const orderApi = new OrderApi();

export default orderApi;
