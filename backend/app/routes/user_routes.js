import express from "express";
import UserService from "../services/UserService.js";

const user_router = express.Router();
const userService = new UserService();

// Create a new user
/*
user_router.post("/users", async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});*/

// Create user(s) - supports both single and bulk creation
user_router.post("/users", async (req, res, next) => {
  try {
    const payload = req.body;

    if (Array.isArray(payload)) {
      // Create multiple users
      const users = await Promise.all(
        payload.map((user) => userService.createUser(user)),
      );
      return res.status(201).json(users);
    }

    // Create single user
    const user = await userService.createUser(payload);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// List all users
user_router.get("/users", async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get a user by ID
user_router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Full update
user_router.put("/users/:id", async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Partial update
user_router.patch("/users/:id", async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete a user
user_router.delete("/users/:id", async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default user_router;
