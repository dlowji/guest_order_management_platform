import { Dish } from "../../../../models/index.js";

export const toggleDishStatus = async (req, res) => {
  const { dishId } = req.params;
  const dish = await Dish.findById(dishId).catch((err) => {
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

  //toggle dish status
  dish.status = dish.status === "AVAILABLE" ? "UN_AVAILABLE" : "AVAILABLE";

  await dish.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Dish status updated successfully",
    code: "SUCCESS",
    data: dish,
  });
};

/**
 * @swagger
 * /kitchen/dishes/toggle/:id:
 *    post:
 *      summary: Toggle Dish Status.
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
 *          description: Dish status updated successfully.
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

