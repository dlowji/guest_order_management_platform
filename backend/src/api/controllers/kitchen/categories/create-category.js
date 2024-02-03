import { validateCreateCategory } from "../../../validators/kitchen.validator.js";
import { Category } from "../../../../models/index.js";

export const createCategory = async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const { name, icon, link } = req.body;

  //check if category's name exists
  const existCategory = await Category.exists({ name }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (existCategory) {
    return res.status(409).json({
      error: {
        message: "The category name is already taken.",
        code: "FIELD_ALREADY_EXISTS",
      },
    });
  }

  let category = new Category({
    name,
    icon,
    link,
  });

  category = await category.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(201).json({
    message: "Category created successfully",
    code: "SUCCESS",
    data: category,
  });
};
