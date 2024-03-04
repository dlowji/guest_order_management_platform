import { Dish } from "../../../../models/index.js";

export const getDishById = async (req, res) => {
  const { id } = req.params;
  const dish = await Dish.findById(id).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (!dish) {
    return res.status(401).json({
      error: {
        message: "Dish not found",
        code: "NOT_FOUND",
      },
    });
  }
  return res.status(200).json({
    message: "Dish retrieved successfully",
    code: "SUCCESS",
    data: dish,
  });
};
