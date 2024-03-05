import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    photoUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    },
    language: {
      type: String,
      enum: ["vi", "en"],
      default: "en",
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *          type: string
 *         username:
 *          type: string
 *         password:
 *          type: string
 *         lastLogin:
 *          type: string
 *         photoUrl:
 *          type: string
 *         language:
 *          type: string
 *         isActivated:
 *          type: boolean
 *         deletedAt:
 *          type: string
 *         employee:
 *          $ref: "#/components/schemas/Employee"
 *
 */
