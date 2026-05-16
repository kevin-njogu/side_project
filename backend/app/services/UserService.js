import mongoose from "mongoose";
import User from "../models/User.js";

class UserService {
  async createUser(payload) {
    return User.create(payload);
  }

  async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findById(id).exec();
  }

  async getUserByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    if (includePassword) query.select("+password");
    return query.exec();
  }

  async updateUser(id, updates) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
      runValidators: true,
    }).exec();
  }

  async deleteUser(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const deleted = await User.findByIdAndDelete(id).exec();
    return deleted != null;
  }

  async listUsers(filter = {}, options = {}) {
    const query = User.find(filter);
    if (options.select) query.select(options.select);
    if (options.sort) query.sort(options.sort);
    if (typeof options.skip === "number") query.skip(options.skip);
    if (typeof options.limit === "number") query.limit(options.limit);
    return query.exec();
  }
}

export default UserService;
