import { model } from "mongoose";
import { Order } from "../../../models/index.js";

export const getOrderById = async (req, res) => {
  let { id: orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("table")
    .populate({
      path: "lineItems",
      populate: {
        path: "dish",
        model: "Dish",
      },
    })
    .populate({
      path: "user",
      populate: {
        path: "employee",
        model: "Employee",
      },
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

  if (!order) {
    return res.status(401).json({
      error: {
        message: "Order not found",
        code: "NOT_FOUND",
      },
    });
  }

  const tableCode = order.table.code;

  const formattedLineItems = order.lineItems.map((item) => {
    return {
      ...item._doc,
      dish: {
        _id: item.dish._id,
        title: item.dish.title,
        status: item.dish.status,
        image: item.dish.image,
      },
    };
  });

  return res.status(200).json({
    message: "Order retrieved by id successfully",
    code: "SUCCESS",
    data: {
      ...order._doc,
      table: { _id: order.table._id, code: tableCode },
      user: {
        _id: order.user._id,
        username: order.user.username,
        employee: {
          _id: order.user.employee._id,
          fullName: order.user.employee.fullName,
        },
      },
      lineItems: formattedLineItems,
    },
  });
};
