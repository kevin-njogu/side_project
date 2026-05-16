import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const roles = ["employee", "admin", "superadmin"];

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    lastName: {
      type: String,
      required: true,
      set: (v) => (typeof v === "string" ? v.trim() : v),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      set: (v) => (typeof v === "string" ? v.toLowerCase().trim() : v),
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "employee",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
);

UserSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
  })
  .set(function (v) {
    if (typeof v !== "string") return;
    const parts = v.split(" ");
    this.firstName = parts.shift() || "";
    this.lastName = parts.join(" ") || "";
  });

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/*
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
*/

UserSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

UserSchema.methods.isAdmin = function () {
  return this.role === "admin" || this.role === "superadmin";
};

UserSchema.methods.isSuperAdmin = function () {
  return this.role === "superadmin";
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.models.User ?? mongoose.model("User", UserSchema);
