import { Order, LineItem } from "../../../../models/index.js";
import { validateMarkDishDone } from "../../../validators/kitchen.validator.js";
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

  const { orderId, lineItems } = req.body;
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

  lineItems.forEach(async (item) => {
    const { lineItemId } = item;
    const existLineItem = order.lineItems.find((id) => id.toString() === lineItemId);
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
      const update = {
        status: "COOKED",
      };
      await LineItem.findByIdAndUpdate(lineItemId, update, { new: true })
        .then((updatedLineItem) => {
          markedDoneLineItems.push(updatedLineItem);
        })
        .catch((err) => {
          return res.status(500).json({
            error: {
              message: "An internal server error occurred, please try again.",
              code: "INTERNAL_SERVER_ERROR",
              reason: err.message,
            },
          });
        });
    }
  });

  //update order's last processing time
  const currentTime = Date.now();
  const update = {
    lastProcessing: currentTime,
  };
  await Order.findOneAndUpdate({ _id: orderId }, update, { new: true }).catch(
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

  return res.status(200).json({
    message: "Dish marked done successfully",
    code: "SUCCESS",
    data: markedDoneLineItems,
  });
};
