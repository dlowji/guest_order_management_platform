import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
export default Category;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        icon:
 *          type: string
 *        link:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
