import { Category, Dish } from "../../../../models/index.js";
import { capitalizeFirstLetter } from "../../../../utils/helpers/capitalize-first-letter.js";

export const getDishesByCategory = async (req, res) => {
  let { categoryQ } = req.query;
  categoryQ = capitalizeFirstLetter(categoryQ);
  //check if category exists
  const existCategory = await Category.exists({ name: categoryQ }).catch(
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
  if (!existCategory) {
    return res.status(404).json({
      error: {
        message: "Category not found",
        code: "NOT_FOUND",
      },
    });
  }
  const category = await Category.findOne({ name: categoryQ }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  const dishes = await Dish.find({ category: category._id }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Dishes retrieved by category successfully",
    code: "SUCCESS",
    categoryQuery: categoryQ,
    data: dishes,
  });
};
