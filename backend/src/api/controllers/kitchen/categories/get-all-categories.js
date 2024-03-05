import { Category } from "../../../../models/index.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });
  return res.status(200).json({
    message: "Categories retrieved successfully",
    code: "SUCCESS",
    data: categories,
  });
};

/**
 * @swagger
 * /kitchen/categories:
 *    get:
 *      summary: Get All Categories
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Kitchen
 *      responses:
 *        "200":
 *          description: Categories retrieved successfully.
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
 *                             type: array
 *                             $ref: '#/components/schemas/Category'
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
