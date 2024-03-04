import { Order, Dish, LineItem } from "../../../models/index.js";
import { validatePlaceOrder } from "../../validators/order.validator.js";

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

  const existOrder = await Order.findById(orderId).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (!existOrder) {
    return res.status(401).json({
      error: {
        message: "Order not found",
        code: "NOT_FOUND",
      },
    });
  }

  if (!allowedOrderStatus.includes(existOrder.status)) {
    return res.status(400).json({
      error: {
        message: "Order is not in a valid state to be processed",
        code: "BAD_REQUEST",
        currentState: existOrder.status,
      },
    });
  }

  var change = false;
  const transformedLineItems = [];
  //handle errors
  for (const item of orderedLineItems) {
    let transformedItem = {
      ...item,
      updateQuantity: false,
      updateNote: false,
      isCreate: false,
    };
    const { lineItemId } = item;
    //update order
    if (lineItemId) {
      //check if line item is in order
      const existLineItem = existOrder.lineItems.find(
        (id) => id.toString() === lineItemId
      );
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
      const { quantity: newQuantity, note: newNote } = item;
      const { quantity: oldQuantity, note: oldNote } = lineItem;

      if (oldQuantity > newQuantity) {
        return res.status(400).json({
          error: {
            message: "Quantity cannot be decreased",
            code: "BAD_REQUEST",
          },
        });
      }
      if (newQuantity > oldQuantity) {
        transformedItem = { ...transformedItem, updateQuantity: true };
        change = true;
      }

      if (oldNote !== newNote) {
        transformedItem = { ...transformedItem, updateNote: true };
        change = true;
      }
      console.log(transformedItem);
      if (
        !transformedItem.updateQuantity &&
        transformedItem.updateNote &&
        lineItem.status !== "UN_COOK"
      ) {
        return res.status(400).json({
          error: {
            message:
              "Cannot update note of the ordered line item which is preparing or prepared",
            code: "BAD_REQUEST",
          },
        });
      }
    } else {
      const { dishId } = item;
      const dish = await Dish.findById(dishId).catch((err) => {
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
      transformedItem.isCreate = true;
      change = true;
    }
    transformedLineItems.push(transformedItem);
  }

  if (!change) {
    return res.status(400).json({
      error: {
        message: "No changes in the order",
        code: "BAD_REQUEST",
      },
    });
  }

  transformedLineItems.forEach(async (item) => {
    if (item.updateQuantity || item.updateNote) {
      const { lineItemId } = item;
      const lineItem = await LineItem.findById(lineItemId).catch((err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      });

      const { quantity: newQuantity, note: newNote } = item;
      const { quantity: oldQuantity, note: oldNote } = lineItem;

      //in the case update quantity of the line item, the status of the line item must be UN_COOK
      //otherwise, the system will create a new line item with the quantity = quantity - oldQuantity
      if (item.updateQuantity) {
        if (lineItem.status == "UN_COOK") {
          lineItem.quantity += newQuantity - oldQuantity;
        } else {
          const newLineItem = new LineItem({
            order: orderId,
            dishId: lineItem.dishId,
            quantity: newQuantity - oldQuantity,
            price: lineItem.price,
            note: newNote,
          });
          await newLineItem
            .save()
            .then((newLineItem) => {
              //update the new line item into the order
              Order.findByIdAndUpdate(orderId, {
                $push: { lineItems: newLineItem._id },
              }).catch((err) => {
                return res.status(500).json({
                  error: {
                    message:
                      "An internal server error occurred, please try again.",
                    code: "INTERNAL_SERVER_ERROR",
                    reason: err.message,
                  },
                });
              });
            })
            .catch((err) => {
              return res.status(500).json({
                error: {
                  message:
                    "An internal server error occurred, please try again.",
                  code: "INTERNAL_SERVER_ERROR",
                  reason: err.message,
                },
              });
            });
        }
      }
      if (item.updateNote) {
        lineItem.note = newNote;
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
    } else if (item.isCreate) {
      const { dishId, quantity, note } = item;
      const dish = await Dish.findById(dishId).catch((err) => {
        return res.status(500).json({
          error: {
            message: "An internal server error occurred, please try again.",
            code: "INTERNAL_SERVER_ERROR",
            reason: err.message,
          },
        });
      });

      const lineItem = new LineItem({
        order: orderId,
        dish: dish._id,
        quantity: quantity,
        price: dish.price,
        note: note,
      });
      await lineItem
        .save()
        .then(async (lineItem) => {
          //update the new line item into the order
          await Order.findByIdAndUpdate(
            orderId,
            {
              $push: { lineItems: lineItem._id },
            },
            { new: true }
          ).catch((err) => {
            return res.status(500).json({
              error: {
                message: "An internal server error occurred, please try again.",
                code: "INTERNAL_SERVER_ERROR",
                reason: err.message,
              },
            });
          });
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

  setTimeout(async () => {
    const order = await Order.findOne({ _id: orderId }).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

    return res.status(200).json({
      message: "Order updated successfully",
      code: "SUCCESS",
      data: order,
    });
  }, 500);
};
