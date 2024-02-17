import Joi from "joi";

export function validateCreateTable(body) {
  const schema = Joi.object({
    code: Joi.string().required().trim().messages({
      "any.required": "Please enter table name",
      "string.empty": "Please enter a valid table name",
    }),
    capacity: Joi.number().required().min(2).max(8).messages({
      "any.required": "Please enter table capacity",
      "number.empty": "Please enter a valid table capacity",
      "number.base": "Capacity must be a number",
      "number.min": "Capacity must be at least 2",
      "number.max": "Capacity must be at most 8",
    }),
  });
  return schema.validate(body);
}
