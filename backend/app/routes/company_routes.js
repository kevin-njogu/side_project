import express from "express";
import Company from "../models/Company.js";
import CompanyService from "../services/CompanyService.js";

const company_router = express.Router();
const companyService = new CompanyService(Company);

// Create a new Company (POST)
company_router.post("/company", async (req, res) => {
  try {
    const newCompany = await companyService.create(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get filtered companies (GET)
company_router.get("/filter/company", async (req, res) => {
  try {
    const { filter = {}, options = {} } = req.body;
    const companies = await companyService.list(filter, options);
    res.json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all companies (GET)
company_router.get("/companies", async (req, res) => {
  try {
    const companies = await companyService.listAll();
    res.json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single Company by ID (GET)
company_router.get("/company/:id", async (req, res) => {
  try {
    const company = await companyService.getById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a Company by ID (PUT)
company_router.put("/company/:id", async (req, res) => {
  try {
    const updatedCompany = await companyService.update(req.params.id, req.body);
    if (!updatedCompany)
      return res.status(404).json({ message: "Company not found" });
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Company by ID (DELETE)
company_router.delete("/company/:id", async (req, res) => {
  try {
    const deleted = await companyService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default company_router;
