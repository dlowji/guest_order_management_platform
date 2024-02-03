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
