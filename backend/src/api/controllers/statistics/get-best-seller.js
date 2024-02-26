import { LineItem } from "../../../models/index.js";

export const getBestSeller = async (req, res) => {
  const limit = 5;
  const bestSeller = await LineItem.aggregate([
    {
      $group: {
        _id: "$dish",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: limit,
    },
  ]).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  return res.status(200).json({
    message: "Best seller retrieved successfully",
    code: "SUCCESS",
    data: bestSeller,
  });
};
