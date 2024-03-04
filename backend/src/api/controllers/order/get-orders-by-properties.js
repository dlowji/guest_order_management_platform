import { Order, SeveredTable, User } from "../../../models/index.js";

export const getOrdersByProperties = async (req, res) => {
  const allowedOrderStatus = [
    "CREATED",
    "IN_PROCESSING",
    "CANCELED",
    "COMPLETED",
  ];
  let { userId, tableId, statusQ } = req.query;
  let filter = {};

  //check if exist userID
  if (userId) {
    const existUser = await User.exists({ _id: userId }).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });
    if (!existUser) {
      return res.status(401).json({
        error: {
          message: "User not found",
          code: "NOT_FOUND",
        },
      });
    }

    filter.user = userId;
  }

  //check if exist tableId
  if (tableId) {
    //check if table exists
    const existTable = await SeveredTable.exists({ _id: tableId }).catch(
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

    if (!existTable) {
      return res.status(401).json({
        error: {
          message: "Table not found",
          code: "NOT_FOUND",
        },
      });
    }

    filter.table = tableId;
  }

  if (statusQ) {
    if (Array.isArray(statusQ)) {
      for (let status of statusQ) {
        status = status.toUpperCase();
        if (allowedOrderStatus.includes(status)) {
          filter.status = Array.isArray(filter.status)
            ? [...filter.status, status]
            : [status];
        }
      }
    } else if (typeof statusQ === "string") {
      if (allowedOrderStatus.includes(statusQ.toUpperCase())) {
        filter.status = [statusQ.toUpperCase()];
      }
    }
  }

  const orders = await Order.find({
    ...filter,
    status: filter.status
      ? { $in: filter.status }
      : { $in: allowedOrderStatus },
  })
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
          message:
            "(Order.find) An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

  const formattedOrders = orders.map((order) => {
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
    message: "Order retrieved by properties successfully",
    code: "SUCCESS",
    properties: Object.keys(filter).length ? filter : "ALL",
    data: formattedOrders,
  });
};
