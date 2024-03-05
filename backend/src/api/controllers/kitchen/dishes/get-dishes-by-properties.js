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
  return res.status(200).json({
    message: "Dishes retrieved successfully",
    code: "SUCCESS",
    filter,
    data: dishes,
  });
};

/**
 * @swagger
 * /kitchen/dishes:
 *    get:
 *      summary: Get Dish By Properties.
 *      parameters:
 *        - in: query
 *          name: categoryQ
 *          schema:
 *            type: string
 *            required: false
 *          description: The category name
 *        - in: query
 *          name: statusQ
 *          schema:
 *            type: string
 *            required: false
 *          description: The status of the dish
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Kitchen
 *      responses:
 *        "200":
 *          description: Dish retrieved successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: string
 *                          message:
 *                              type: string
 *                          filter:
 *                              type: object
 *                              properties:
 *                                category:
 *                                  type: string
 *                                status:
 *                                  type: string
 *                          data:
 *                              type: array
 *                              $ref: '#/components/schemas/Dish'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
