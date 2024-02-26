import { Order, SeveredTable } from "../../../models/index.js";

export const getOrdersByProperties = async (req, res) => {
  const allowedOrderStatus = [
    "CREATED",
    "IN_PROCESSING",
    "CANCELED",
    "COMPLETED",
  ];
  let { tableId, statusQ } = req.query;
  let filter = {};

  //check if exist tableId and status does not exist then return all orders
  if (tableId) {
    //check if table exists
    const existTable = await SeveredTable.exists(tableId).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

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
    if (allowedOrderStatus.includes(statusQ.toUpperCase())) {
      filter.status = statusQ;
    }
  }

  const orders = await Order.find(filter).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Order retrieved by properties successfully",
    code: "SUCCESS",
    properties: Object.keys(filter).length ? filter : "ALL",
    data: orders,
  });
};
