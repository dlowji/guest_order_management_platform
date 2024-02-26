import http from "./http";
import { formatCurrency } from "../utils/formatCurrency";
import { statisticItemsDashboard } from "../constants/StatisticItemsDashboard";

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
        message: "Can't create order due to an internal server error",
      };
    }
  }

  async getOrders(status) {
    try {
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

  async getProcessingOrderByTableId(tableId) {
    try {
      const response = await this.request.get(`${this.url}/?tableId=${tableId}?statusQ=PROCESSING`);
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

  async updateOrderedLineItems(orderId, items) {
    if (!orderId || !items || items.length === 0) {
      return {
        code: 400,
        message: "Can't create order line items",
      };
    }
    try {
      const response = await this.request.post(`${this.url}/placed`, {
        orderId,
        updateOrderLineItemRequests: [...items],
      });

      if (response.data.code === 0) {
        return {
          code: 200,
          message: "Order placed successfully",
        };
      } else {
        return {
          code: 400,
          message: response.data.message || "Can't create order line items",
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
        progressOrderLineItemRequestList: items.map((item) => ({
          id: item.orderLineItemId,
          quantity: item.quantity,
          orderLineItemStatus: item.orderLineItemStatus,
        })),
      });

      if (response.data.code === 0) {
        return {
          code: 200,
          message: "Order progressed successfully",
        };
      } else {
        return {
          code: 400,
          message: response.data.message || "Can't progress order",
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

      if (response.data.code === 0) {
        return {
          code: 200,
          message: "Order checked out successfully",
        };
      } else {
        return {
          code: 400,
          message: response.data.message || "Can't checkout order",
        };
      }
    } catch (error) {
      return {
        code: 400,
        message: "Can't checkout order",
      };
    }
  }

  async getBestSeller(limit = 5) {
    try {
      const response = await this.request.get(
        `${this.url}/best-seller/${limit}`
      );
      if (response.data.code === 0) {
        const bestSeller = response?.data?.data || [];
        console.log("🚀 ~ OrderApi ~ getBestSeller ~ bestSeller:", bestSeller);
        return {
          code: 200,
          items: bestSeller,
        };
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

const orderApi = new OrderApi();

export default orderApi;
