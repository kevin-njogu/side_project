import { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    phone: {
      type: String,
      match: [/^\+?[0-9\s\-()]{7,}$/, "Please fill a valid phone number"],
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/\S*)?$/,
        "Please fill a valid URL",
      ],
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    industry: {
      type: String,
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    address: {
      street: {
        type: String,
        set: (v) => (typeof v === "string" ? v.trim() : v),
      },
      city: {
        type: String,
        set: (v) => (typeof v === "string" ? v.trim() : v),
      },
      state: {
        type: String,
        set: (v) => (typeof v === "string" ? v.trim() : v),
      },
      zip: { type: String, set: (v) => (typeof v === "string" ? v.trim() : v) },
      country: {
        type: String,
        set: (v) => (typeof v === "string" ? v.trim() : v),
      },
    },
    description: {
      type: String,
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    foundedDate: {
      type: Date,
      validate: {
        validator: (v) => !v || v <= new Date(),
        message: "foundedDate cannot be in the future",
      },
      set: (v) => (v ? new Date(v) : v),
    },
    employeesCount: {
      type: Number,
      min: 0,
      default: 0,
      set: (v) => {
        const n = Number(v);
        return Number.isNaN(n) ? 0 : n;
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      set: (v) => Boolean(v),
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true, getters: true },
  },
);

export default model("Company", companySchema);
