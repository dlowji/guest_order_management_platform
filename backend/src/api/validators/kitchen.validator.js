import Joi from "joi";

export function validateCreateCategory(body) {
  const schema = Joi.object({
    name: Joi.string().required().trim().messages({
      "any.required": "Please enter category name",
      "string.empty": "Please enter a valid category name",
    }),
    icon: Joi.string().required().trim().messages({
      "any.required": "Please enter category icon",
      "string.empty": "Please enter a valid category icon",
    }),
    link: Joi.string().required().trim().messages({
      "any.required": "Please enter category link",
      "string.empty": "Please enter a valid category link",
    }),
  });
  return schema.validate(body);
}

export function validateCreateDish(body) {
  const allowedCategories = ["Drink", "Dessert", "Pizza", "Hamburger", "Pasta"];
  const schema = Joi.object({
    title: Joi.string().required().trim().messages({
      "any.required": "Please enter dish title",
      "string.empty": "Please enter a valid dish title",
    }),
    image: Joi.string().required().trim().messages({
      "any.required": "Please enter dish image",
      "string.empty": "Please enter a valid dish image",
    }),
    price: Joi.number().required().min(10).messages({
      "any.required": "Please enter dish price",
      "number.empty": "Please enter a valid dish price",
      "number.base": "Price must be a number",
      "number.min": "Price must be at least 10$",
    }),
    summary: Joi.string().required().trim().messages({
      "any.required": "Please enter dish summary",
      "string.empty": "Please enter a valid dish summary",
    }),
    categoryName: Joi.string().required().valid().trim().messages({
      "any.required": "Please enter dish category",
      "string.empty": "Please enter a valid dish category",
    }),
  });
  return schema.validate(body);
}
