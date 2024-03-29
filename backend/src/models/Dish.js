import mongoose from "mongoose";
const { Schema, model } = mongoose;

const dishSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 10,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "UN_AVAILABLE"],
      default: "AVAILABLE",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Dish = model("Dish", dishSchema);
export default Dish;

/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        image:
 *          type: string
 *        price:
 *          type: number
 *        summary:
 *          type: string
 *        status:
 *          type: string
 *          enum: ["AVAILABLE", "UN_AVAILABLE"]
 *        category:
 *          $ref: '#/components/schemas/Category'
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
