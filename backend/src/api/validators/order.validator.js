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

export function validatePlaceOrder(body) {
  const schema = Joi.object({
    orderId: Joi.string().required().trim().messages({
      "any.required": "Please enter order id",
      "string.empty": "Please enter a valid order id",
    }),
    orderedLineItems: Joi.array().items(
      Joi.object({
        dishId: Joi.string().required().trim().messages({
          "any.required": "Please enter dish id",
          "string.empty": "Please enter a valid dish id",
        }),
        quantity: Joi.number().required().messages({
          "any.required": "Please enter quantity",
          "number.base": "Please enter a valid quantity",
        }),
        note: Joi.string().required.trim().messages({
          "string.empty": "Please enter a valid note",
          "any.required": "Please enter note",
        }),
      })
    ),
  });
  return schema.validate(body);
}
