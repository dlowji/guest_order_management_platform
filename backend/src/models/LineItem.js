import mongoose from "mongoose";
const { Schema, model } = mongoose;

const lineItemSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});
