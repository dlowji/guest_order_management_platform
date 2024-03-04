import { Order } from "../../../models/index.js";

export const getOrderHistoryByDmy = async (req, res) => {
  const { timestamp, filter } = req.params;
  const date = new Date(timestamp * 1000);
  const orders = await Order.find()
    .populate("table")
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

  const ordersByYear = orders.filter(
    (order) => order.createdAt.getFullYear() === date.getFullYear()
  );

  if (filter === "year") {
    return res.status(200).json({
      message: "Order history retrieved by year successfully",
      code: "SUCCESS",
      data: ordersByYear,
    });
  }

  const day = date.getDate();
  const month = date.getMonth();
  const result = [];
  ordersByYear.forEach((order) => {
    const processTime = order.createdAt;
    if (
      filter === "day" &&
      processTime.getDate() === day &&
      processTime.getMonth() === month
    ) {
      result.push(order);
    } else if (filter === "month" && processTime.getMonth() === month) {
      result.push(order);
    }
  });

  const formattedOrders = result.map((order) => {
    return {
      ...order._doc,
      user: {
        _id: order.user._id,
        username: order.user.username,
        employee: {
          _id: order.user.employee._id,
          fullName: order.user.employee.fullName,
        },
      },
      table: { _id: order.table._id, code: order.table.code },
    };
  });

  return res.status(200).json({
    message: `Order history retrieved by ${filter} successfully`,
    code: "SUCCESS",
    data: formattedOrders,
  });
};
