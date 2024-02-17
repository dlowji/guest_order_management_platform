import { required } from "joi";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

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

orderSchema.pre("save", (next) => {
  this.total = this.subTotal + this.tax;
  this.grandTotal = this.total - this.discount - this.itemDiscount;
  next();
});

const Order = model("Order", orderSchema);
export default Order;
