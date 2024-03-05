import { Dish } from "../../../../models/index.js";

export const getDishById = async (req, res) => {
  const { id } = req.params;
  const dish = await Dish.findById(id).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (!dish) {
    return res.status(401).json({
      error: {
        message: "Dish not found",
        code: "NOT_FOUND",
      },
    });
  }
  return res.status(200).json({
    message: "Dish retrieved successfully",
    code: "SUCCESS",
    data: dish,
  });
};

/**
 * @swagger
 * /kitchen/dishes/:id:
 *    get:
 *      summary: Get Dish By Id.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            required: true
 *          description: The dish id
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
 *                          data:
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
