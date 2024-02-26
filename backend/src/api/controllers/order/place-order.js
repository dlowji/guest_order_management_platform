import {
  Order,
  Dish,
  LineItem,
  User,
  SeveredTable,
} from "../../../models/index.js";

export const placeOrder = async (req, res) => {
  //only CREATED and IN_PROCESSING orders can be updated
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

  const { orderId, orderedLineItems } = req.body;

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

  orderedLineItems.forEach(async (item) => {
    const { lineItemId } = item;

    //update order
    if (lineItemId) {
      //check if line item is in order
      const existLineItem = order.lineItems.find((id) => id === lineItemId);
      if (!existLineItem) {
        return res.status(401).json({
          error: {
            message: "Line item not found in this order",
            code: "NOT_FOUND",
          },
        });
      }
      const { quantity, note } = item;
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
      const oldNote = lineItem.note;
      const oldQuantity = lineItem.quantity;

      if (oldQuantity > quantity) {
        return res.status(400).json({
          error: {
            message: "Quantity cannot be decreased",
            code: "BAD_REQUEST",
          },
        });
      }

      if (oldQuantity < quantity) {
        //in the case update quantity of the line item, the status of the line item must be UN_COOK
        //otherwise, the system will create a new line item with the quantity = quantity - oldQuantity
        if (lineItem.status == "UN_COOK") {
          lineItem.quantity += quantity - oldQuantity;
        } else {
          const newLineItem = new LineItem({
            order: orderId,
            dishId: lineItem.dishId,
            quantity: quantity - oldQuantity,
            price: lineItem.price,
            note: note,
          });
          await newLineItem.save().catch((err) => {
            return res.status(500).json({
              error: {
                message: "An internal server error occurred, please try again.",
                code: "INTERNAL_SERVER_ERROR",
                reason: err.message,
              },
            });
          });
          //update the new line item into the order
          Order.findByIdAndUpdate(orderId, {
            $push: { lineItems: newLineItem._id },
          }).catch((err) => {
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
        lineItem.note = note;
      }
      await lineItem.save().catch((err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      });
    } else {
      const { dishId, quantity, note } = item;
      const dish = Dish.findById(dishId).catch((err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      });

      if (!dish) {
        return res.status(401).json({
          error: {
            message: "Dish not found",
            code: "NOT_FOUND",
          },
        });
      }

      const lineItem = new LineItem({
        order: orderId,
        dishId: dishId,
        quantity: quantity,
        price: dish.price,
        note: note,
      });
      await lineItem.save().catch((err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      });
      //update the new line item into the order
      Order.findByIdAndUpdate(orderId, {
        $push: { lineItems: lineItem._id },
      }).catch((err) => {
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

  return res.status(200).json({
    message: "Order updated successfully",
    code: "SUCCESS",
    data: order,
  });
};
