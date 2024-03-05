import mongoose from "mongoose";
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    salary: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    birthDate: {
      type: Date,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = model("Employee", employeeSchema);
export default Employee;

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        fullName:
 *          type: string
 *        email:
 *          type: string
 *        salary:
 *          type: number
 *        phone:
 *          type: string
 *        address:
 *          type: string
 *        gender:
 *          type: string
 *          enum: ["Male", "Female", "Other"]
 *        birthDate:
 *          type: string
 *        role:
 *          $ref: '#/components/schemas/Role'
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
