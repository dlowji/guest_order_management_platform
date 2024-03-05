import { LineItem, Dish } from "../../../models/index.js";

export const getBestSeller = async (req, res) => {
  const limit = 5;
  const bestSeller = await LineItem.aggregate([
    {
      $group: {
        _id: "$dish",
        totalOrderedQuantity: { $sum: "$quantity" },
      },
    },
    {
      $sort: { totalOrderedQuantity: -1 },
    },
    {
      $limit: limit,
    },
  ]).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  const formattedBestSeller = [];

  for (const item of bestSeller) {
    console.log(item._id.toString());
    const dishId = item._id.toString();
    const dishInfo = await Dish.findById(dishId).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

    if (dishInfo) {
      formattedBestSeller.push({
        dish: {
          id: dishInfo._id,
          title: dishInfo.title,
          price: dishInfo.price,
          image: dishInfo.image,
        },
        totalOrderedQuantity: item.totalOrderedQuantity,
      });
    }
  }
  return res.status(200).json({
    message: "Best seller retrieved successfully",
    code: "SUCCESS",
    data: formattedBestSeller,
  });
};

/**
 * @swagger
 * /statistics/best-seller/:limit:
 *    get:
 *      summary: Get Best Seller.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Statistics
 *      responses:
 *        "200":
 *          description: Best seller retrieved successfully.
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
 *                              type: array
 *                              items:
 *                                 type: object
 *                                 properties:
 *                                    dish:
 *                                      type: object
 *                                      properties:
 *                                        id:
 *                                          type: string
 *                                        title:
 *                                          type: string
 *                                        price:
 *                                          type: number
 *                                        image:
 *                                          type: string
 *                                    totalOrderedQuantity:
 *                                      type: number
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
