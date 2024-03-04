import http from "./http";

class KitchenApi {
  constructor() {
    this.request = http;
    this.url = "/kitchen";
  }

  async getDishes(category) {
    try {
      const response = await this.request.get(
        category
          ? `${this.url}/dishes?categoryQ=${category}`
          : `${this.url}/dishes`
      );
      if (response.data.code === "SUCCESS") {
        return response.data.data;
      }

      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getDishesByStatus(status = "available") {
    try {
      const response = await this.request.get(
        `${this.url}/dishes?statusQ=${status}`
      );

      if (response.data.code === "SUCCESS") {
        return response.data.data;
      }

      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getAllCategories() {
    try {
      const response = await this.request.get(`${this.url}/categories`);
      if (response.data.code === "SUCCESS") {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async toggleDishStatus(id) {
    try {
      const response = await this.request.post(`${this.url}/toggle/${id}`);

      if (response.data.code === "SUCCESS") {
        return response.data;
      } else {
        return {
          code: response.data.error.code,
          message: response.data.error.message,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        message: "Something went wrong",
      };
    }
  }

  async markDoneOrder(orderId, items) {
    if (!orderId) {
      return {
        code: 400,
        message: "Can't mark done order",
      };
    }
    try {
      const response = await this.request.post(`${this.url}/mark-done`, {
        orderId,
        lineItems: items
          .filter((item) => {
            return item.status === "COOKED";
          })
          .map((item) => {
            return {
              lineItemId: item._id,
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
        message: "Can't mark done order",
      };
    }
  }
}

const kitchenApi = new KitchenApi();

export default kitchenApi;
