import { Order, LineItem } from "../../../../models/index.js";

export const markDishesDone = async (req, res) => {
  //only CREATED and IN_PROCESSING orders can be updated
  const allowedOrderStatus = ["CREATED", "IN_PROCESSING"];
  const { error } = validateMarkDishDone(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const { orderId, orderedLineItems } = req.body;
  //check if exist order
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
    return res.status(401).json({
      error: {
        message: "Order not found",
        code: "NOT_FOUND",
      },
    });
  }

  //check if order is in a valid state
  if (!allowedOrderStatus.includes(order.status)) {
    return res.status(400).json({
      error: {
        message: "Order is not in a valid state",
        code: "INVALID_STATE",
      },
    });
  }

  const markedDoneLineItems = [];

  orderedLineItems.forEach(async (item) => {
    const { lineItemId } = item;
    const existLineItem = order.lineItems.find((id) => id === lineItemId);
    if (!existLineItem) {
      return res.status(401).json({
        error: {
          message: "Line item not found in this order",
          code: "NOT_FOUND",
        },
      });
    }

    const lineItem = await LineItem.findById(lineItemId).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

    if (!lineItem) {
      return res.status(401).json({
        error: {
          message: "Line item not found",
          code: "NOT_FOUND",
        },
      });
    }
    if (lineItem.status === "COOKING") {
      lineItem.status = "COOKED";
      await lineItem.save().catch((err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      });
      markedDoneLineItems.push(lineItem);
    }
  });

  //update order's last processing time
  const currentTime = Date.now();
  order.lastProcessing = currentTime;
  await order.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Dish marked done successfully",
    code: "SUCCESS",
    data: markedDoneLineItems,
  });
};
