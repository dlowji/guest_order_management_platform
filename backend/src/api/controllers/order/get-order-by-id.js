import { model } from "mongoose";
import { Order } from "../../../models/index.js";

export const getOrderById = async (req, res) => {
  let { id: orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("table")
    .populate({
      path: "lineItems",
      populate: {
        path: "dish",
        model: "Dish",
      },
    })
    .populate({
      path: "user",
      populate: {
        path: "employee",
        model: "Employee",
      },
    })
    .catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

  if (!order) {
    return res.status(401).json({
      error: {
        message: "Order not found",
        code: "NOT_FOUND",
      },
    });
  }

  const tableCode = order.table.code;

  const formattedLineItems = order.lineItems.map((item) => {
    return {
      ...item._doc,
      dish: {
        _id: item.dish._id,
        title: item.dish.title,
        status: item.dish.status,
        image: item.dish.image,
      },
    };
  });

  return res.status(200).json({
    message: "Order retrieved by id successfully",
    code: "SUCCESS",
    data: {
      ...order._doc,
      table: { _id: order.table._id, code: tableCode },
      user: {
        _id: order.user._id,
        username: order.user.username,
        employee: {
          _id: order.user.employee._id,
          fullName: order.user.employee.fullName,
        },
      },
      lineItems: formattedLineItems,
    },
  });
};

/**
 * @swagger
 * /orders/:id:
 *    get:
 *      summary: Get Order by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            required: true
 *          description: The order id
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Order
 *      responses:
 *        "200":
 *          description: Order retrieved by id successfully.
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
 *                              $ref: '#/components/schemas/Order'
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
