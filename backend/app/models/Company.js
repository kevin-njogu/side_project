import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Company", companySchema);
