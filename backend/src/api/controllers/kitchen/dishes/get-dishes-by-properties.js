import { Dish, Category } from "../../../../models/index.js";

export const getDishesByProperties = async (req, res) => {
  let { categoryQ, statusQ } = req.query;
  categoryQ = categoryQ ? categoryQ.toUpperCase() : null;
  statusQ = statusQ ? statusQ.toUpperCase() : null;
  const allowedCategories = ["DRINK", "DESSERT", "PASTA", "HAMBURGER", "PIZZA"];
  const allowedDishesStatus = ["AVAILABLE", "UN_AVAILABLE"];
  const filter = {};
  if (categoryQ) {
    if (allowedCategories.includes(categoryQ)) {
      const category = await Category.findOne({ name: categoryQ }).catch(
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
      filter.category = category._id;
    }
  }

  if (statusQ) {
    if (allowedDishesStatus.includes(statusQ)) {
      filter.status = statusQ;
    }
  }
  const dishes = await Dish.find(filter).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  console.log(dishes);
  return res.status(200).json({
    message: "Dishes retrieved successfully",
    code: "SUCCESS",
    filter,
    data: dishes,
  });
};
