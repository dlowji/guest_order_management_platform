import { Dish } from "../../../../models/index.js";

export const toggleDishStatus = async (req, res) => {
  const { dishId } = req.params;
  const dish = await Dish.findById(dishId).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (!dish) {
    return res.status(404).json({
      error: {
        message: "Dish not found",
        code: "NOT_FOUND",
      },
    });
  }

  //toggle dish status
  dish.status = dish.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

  await dish.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Dish status updated successfully",
    code: "SUCCESS",
    data: dish,
  });
};
