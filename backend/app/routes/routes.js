import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

// Create a new Company (POST)
router.post("/company", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/companies", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

export default router;
