import mongoose from "mongoose";
import {LineItem} from "./index.js";
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

orderSchema.pre("save", (next) => {
  const totalLineItemPrice = this.lineItems.reduce(async (acc, currentId) => {
    await LineItem.find({
      _id: currentId,
      status: { $nin: ["STOCK_OUT", "UN_COOK"] },
    })
      .then((item) => {
        acc += item.price * item.quantity;
      })
      .catch((err) => {
        console.log(err);
      });
  }, 0);
  this.subTotal = totalLineItemPrice;
  this.tax = this.subTotal * TAX_RATE;
  this.total = this.subTotal + this.tax;
  this.grandTotal = this.total - this.discount - this.itemDiscount;
  next();
});

const Order = model("Order", orderSchema);
export default Order;
