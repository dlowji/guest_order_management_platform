import { validateCreateOrder } from "../../validators/order.validator.js";
import { User, SeveredTable, Order } from "../../../models/index.js";

export const createOrder = async (req, res) => {
  const { error } = validateCreateOrder(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const { userId, tableId } = req.body;

  //check if user exists
  const existUser = User.exists({ _id: userId }).catch((err) => {
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

  //check if table exists
  const existTable = SeveredTable.findById(tableId).catch((err) => {
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

  //check if table is free
  const isTableFree = existTable.tableStatus === "FREE";
  if (!isTableFree) {
    return res.status(409).json({
      error: {
        message: "The table is not free right now.",
        code: "FIELD_NOT_AVAILABLE",
      },
    });
  }

  //update table status
  const update = {
    tableStatus: "OCCUPIED",
  };
  await SeveredTable.findByIdAndUpdate(tableId, update).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  let order = new Order({
    user: userId,
    table: tableId,
    subTotal: 0,
    total: 0,
    grandTotal: 0,
  });

  order = await order.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });


  return res.status(201).json({
    message: "Order created successfully",
    code: "SUCCESS",
    data: order,
  });
};
