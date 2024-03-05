import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Admin", "Employee", "Chef"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = model("Role", roleSchema);
export default Role;

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *          enum: ["Admin", "Employee", "Chef"]
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
