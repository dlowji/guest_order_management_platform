import mongoose from "mongoose";
const { Schema, model } = mongoose;

const severedTableSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tableStatus: {
    type: String,
    enum: ["FREE", "CHECK_IN", "OCCUPIED"],
    default: "FREE",
  },
  capacity: {
    type: Number,
    required: true,
    min: 2,
    max: 8,
  },
});

const SeveredTable = model("SeveredTable", severedTableSchema);
export default SeveredTable;

/**
 * @swagger
 * components:
 *   schemas:
 *     SeveredTable:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        code:
 *          type: string
 *        tableStatus:
 *          type: string
 *          enum: ["FREE", "CHECK_IN", "OCCUPIED"]
 *        capacity:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
