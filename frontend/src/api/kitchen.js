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

        if (response.data.code === 0) {
            return {
                code: 200,
                message: response.data.message,
            };
        }
        return {
            code: 500,
            message: response.data.message,
        };
    } catch (error) {
        console.log(error);
        return {
            code: 500,
            message: 'Something went wrong',
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
            markDoneOrderLineItemRequests: items
                .filter((item) => {
                    return item.orderLineItemStatus === "COOKED";
                })
                .map((item) => {
                    return {
                        id: item.orderLineItemId,
                    };
                }),
        });

        if (response.data.code === 0) {
            return {
                code: 200,
                message: 'Order marked done successfully',
            };
        } else {
            return {
                code: 400,
                message: response.data.message || "Can't mark done order",
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
