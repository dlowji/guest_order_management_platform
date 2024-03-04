import { Order, LineItem } from "../../../models/index.js";

export const progressOrder = async (req, res) => {
  const { orderId, progressLineItems } = req.body;

  const allowedOrderStatus = ["CREATED"];

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

  if (!allowedOrderStatus.includes(order.status)) {
    return res.status(409).json({
      error: {
        message: "Order can't be processed",
        code: "CONFLICT",
      },
    });
  }

  progressLineItems.forEach(async (item) => {
    const { lineItemId, quantity, status } = item;
    const existLineItem = order.lineItems.find(
      (itemId) => itemId.toString() === lineItemId
    );
    if (!existLineItem) {
      return res.status(401).json({
        error: {
          message: "Order line item not found",
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
          message: "Order line item not found",
          code: "NOT_FOUND",
        },
      });
    }

    const update = {
      status: "COOKING",
    };

    if (status === "STOCK_OUT") {
      update.status = "STOCK_OUT";
    }
    await LineItem.findOneAndUpdate({ _id: lineItemId }, update).catch(
      (err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      }
    );
  });

  const currentTime = Date.now();
  const update = {
    status: "IN_PROCESSING",
    lastProcessing: currentTime,
  };

  setTimeout(async () => {
    const order = await Order.findOneAndUpdate({ _id: orderId }, update, {
      new: true,
    }).catch((err) => {
      return res.status(500).json({
        error: {
          message:
            "Order(findOneAndUpdate): An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });
    return res.status(200).json({
      message: "Order processed successfully",
      code: "SUCCESS",
      data: order,
    });
  }, 500);
};
