import {
  Order,
  Dish,
  LineItem,
  User,
  SeveredTable,
} from "../../../models/index.js";

export const placeOrder = async (req, res) => {
  const allowedOrderStatus = ["CREATED", "IN_PROCESSING"];
  const { error } = validatePlaceOrder(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }
  const { orderId, items } = req.body;
  const order = await Order.findById(orderId).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  if (!order) {
    return res.status(404).json({
      error: {
        message: "Order not found",
        code: "NOT_FOUND",
      },
    });
  }
  if (!allowedOrderStatus.includes(order.status)) {
    return res.status(400).json({
      error: {
        message: "Order is not in a valid state to be processed",
        code: "BAD_REQUEST",
        currentState: order.status,
      },
    });
  }

  items.forEach(async (item) => {
    const { lineItemId } = item;
    const updateQuantity = false;
    const updateNote = false;
    //update order
    if (lineItemId) {
      //check if line item is in order
      const existLineItem = order.items.find((item) => item._id === lineItemId);
      if (!existLineItem) {
        return res.status(404).json({
          error: {
            message: "Line item not found",
            code: "NOT_FOUND",
          },
        });
      }
      const { quantity, note } = item;
      const oldNote = existLineItem.note;
      const oldQuantity = existLineItem.quantity;

      if (oldQuantity > quantity) {
        return res.status(400).json({
          error: {
            message: "Quantity cannot be decreased",
            code: "BAD_REQUEST",
          },
        });
      }
      if (oldQuantity < quantity) {
        if (existLineItem.status == "UN_COOK") {
          existLineItem.quantity = oldQuantity + quantity;
        } else {
          const lineItem = new LineItem({
            order: orderId,
            dishId: item.dishId,
            quantity: quantity,
            price: existLineItem.price,
            note: note,
          });
          lineItem = await lineItem.save().catch((err) => {
            return res.status(500).json({
              error: {
                message: "An internal server error occurred, please try again.",
                code: "INTERNAL_SERVER_ERROR",
                reason: err.message,
              },
            });
          });
        }
      }
      if (oldNote !== note) {
        existLineItem.note = note;
      }
      //update order bill
      const extraPrice = (quantity - oldQuantity) * existLineItem.price;
      order.subTotal += extraPrice;
    }
    const dish = Dish.findById(item.dishId).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });
    if (!dish) {
      return res.status(404).json({
        error: {
          message: "Dish not found",
          code: "NOT_FOUND",
        },
      });
    }
  });
};
