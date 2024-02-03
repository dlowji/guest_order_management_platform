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
