import { Category, Dish } from "../../../../models/index.js";
import { validateCreateDish } from "../../../validators/kitchen.validator.js";

export const createDish = async (req, res) => {
  const { error } = validateCreateDish(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const { title, image, price, summary, categoryName } = req.body;

  //check if dish's title exists
  const existDish = await Dish.exists({ title }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (existDish) {
    return res.status(409).json({
      error: {
        message: "The dish title is already taken.",
        code: "FIELD_ALREADY_EXISTS",
      },
    });
  }

  const category = await Category.findOne({ name: categoryName }).catch(
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

  if (!category) {
    return res.status(404).json({
      error: {
        message: "Category not found",
        code: "NOT_FOUND",
      },
    });
  }

  let dish = new Dish({
    title,
    image,
    price,
    summary,
    category: category._id,
  });

  dish = await dish.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(201).json({
    message: "Dish created successfully",
    code: "SUCCESS",
    data: dish,
  });
};
