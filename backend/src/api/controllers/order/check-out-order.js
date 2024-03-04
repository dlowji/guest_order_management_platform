import { Order, SeveredTable } from "../../../models/index.js";

export const checkOutOrder = async (req, res) => {
  const { orderId } = req.body;
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

  await SeveredTable.findByIdAndUpdate(order.table._id, {
    tableStatus: "FREE",
  })
    .then(async () => {
      const update = {
        status: "COMPLETED",
      };
      await Order.findByIdAndUpdate(orderId, update).catch((err) => {
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

  setTimeout(async () => {
    const order = await Order.findById(orderId).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });
    return res.status(200).json({
      message: "Order checked out successfully",
      code: "SUCCESS",
      data: {
        ...order._doc,
        table: order.table._id,
        tableCode: order.table.code,
      },
    });
  }, 500);
};
