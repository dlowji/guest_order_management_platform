import { Order } from "../../../models/index.js";

export const getOrderById = async (req, res) => {
  let { orderId } = req.query;
  const order = await Order.findById(orderId)
    .populate("table")
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

  return res.status(200).json({
    message: "Order retrieved by id successfully",
    code: "SUCCESS",
    data: { ...order._doc, tableCode },
  });
};
