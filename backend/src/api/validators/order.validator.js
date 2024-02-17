import Joi from "joi";

export function validateCreateOrder(body) {
  const schema = Joi.object({
    userId: Joi.string().required().trim().messages({
      "any.required": "Please enter user id",
      "string.empty": "Please enter a valid user id",
    }),
    tableId: Joi.string().required().trim().messages({
      "any.required": "Please enter table id",
      "string.empty": "Please enter a valid table id",
    }),
  });
  return schema.validate(body);
}
