import { Dish } from "../../../../models/index.js";

export const getDishesByStatus = async (req, res) => {
  let { statusQ } = req.query;
  statusQ = statusQ.toUpperCase();
  const dishes = await Dish.find({ status: statusQ }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  return res.status(200).json({
    message: "Dishes retrieved by status successfully",
    code: "SUCCESS",
    statusQuery: statusQ,
    data: dishes,
  });
};
