import mongoose from "mongoose";
const { Schema, model } = mongoose;

const lineItemSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    dish: {
      type: Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    note: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["STOCK_OUT", "UN_COOK", "COOKING", "COOKED"],
      default: "UN_COOK",
    },
  },
  { timestamps: true }
);
const LineItem = model("LineItem", lineItemSchema);
export default LineItem;

/**
 * @swagger
 * components:
 *   schemas:
 *     LineItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         order:
 *           $ref: '#/components/schemas/Order'
 *         dish:
 *           $ref: '#/components/schemas/Dish'
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *         note:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["STOCK_OUT", "UN_COOK", "COOKING", "COOKED"]
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
