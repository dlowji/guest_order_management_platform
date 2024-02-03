import { Dish } from "../../../../models/index.js";

export const getAllDishes = async (req, res) => {
  const dishes = await Dish.find().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  return res.status(200).json({
    message: "Dishes retrieved successfully",
    code: "SUCCESS",
    data: dishes,
  });
};
