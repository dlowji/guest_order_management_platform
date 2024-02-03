import { Category } from "../../../../models/index.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  return res.status(200).json({
    message: "Categories retrieved successfully",
    code: "SUCCESS",
    data: categories,
  });
};
