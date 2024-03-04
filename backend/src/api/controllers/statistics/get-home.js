import { Order, SeveredTable } from "../../../models/index.js";

export const getHome = async (req, res) => {
  const currentDate = Date.now();
  const orders = await Order.find().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  const currentDateOrders = orders.filter(
    (order) =>
      new Date(order.createdAt).toDateString() ===
      new Date(currentDate).toDateString()
  );

  const currentDateRevenue = currentDateOrders.reduce((acc, order) => {
    if (order.status === "COMPLETED") {
      return acc + order.grandTotal;
    }
    return acc;
  }, 0);

  const currentDateTotalOrders = currentDateOrders.length;

  const currentDateDiningOrders = currentDateOrders.filter(
    (order) => order.status === "IN_PROCESSING"
  ).length;

  const freeTables = await SeveredTable.count({ tableStatus: "FREE" }).catch(
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
  const data = {
    revenue: currentDateRevenue,
    totalOrders: currentDateTotalOrders,
    diningOrders: currentDateDiningOrders,
    freeTables,
  };

  return res.status(200).json({
    message: "Home statistics retrieved successfully",
    code: "SUCCESS",
    data,
  });
};
