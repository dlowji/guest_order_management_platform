import mongoose from "mongoose";
import { LineItem } from "./index.js";
const { Schema, model } = mongoose;

const TAX_RATE = 0.1;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: "SeveredTable",
      required: true,
    },
    lineItems: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "LineItem",
          required: true,
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["CREATED", "IN_PROCESSING", "CANCELED", "COMPLETED"],
      default: "CREATED",
    },
    lastProcessing: {
      type: Date,
      default: Date.now,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    itemDiscount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    promoCode: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  let totalLineItemsPrice = 0;
  for (const currentId of docToUpdate.lineItems) {
    const item = await LineItem.findOne({
      _id: currentId,
      status: { $nin: ["STOCK_OUT", "UN_COOK"] },
    }).catch((err) => {
      console.log(err);
    });
    if (item) {
      totalLineItemsPrice += item.price * item.quantity;
    }
  }
  docToUpdate.subTotal = totalLineItemsPrice;
  docToUpdate.tax = docToUpdate.subTotal * TAX_RATE;
  docToUpdate.total = docToUpdate.subTotal + docToUpdate.tax;
  docToUpdate.grandTotal =
    docToUpdate.total - docToUpdate.discount - docToUpdate.itemDiscount;
  next();
});

const Order = model("Order", orderSchema);
export default Order;

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         table:
 *           $ref: '#/components/schemas/SeveredTable'
 *         lineItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LineItem'
 *         status:
 *           type: string
 *           enum: ["CREATED", "IN_PROCESSING", "CANCELED", "COMPLETED"]
 *         lastProcessing:
 *           type: string
 *         subTotal:
 *           type: number
 *         itemDiscount:
 *           type: number
 *         tax:
 *           type: number
 *         total:
 *           type: number
 *         promoCode:
 *           type: string
 *         discount:
 *           type: number
 *         grandTotal:
 *           type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
