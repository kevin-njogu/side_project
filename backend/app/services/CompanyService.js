import models from "../models/Company.js";

class CompanyService {
  /**
   * Construct the service with an ORM model. If no model is provided
   * it will attempt to require ../models and use models.Company.
   * @param {Object} model - ORM model for companies
   */
  constructor(model) {
    this.Company = model ?? Company;
  }

  _ensureModel() {
    if (!this.Company) throw new Error("Company model not available");
  }

  async create(attrs) {
    this._ensureModel();
    const created = await this.Company.create(attrs);
    return created;
  }

  async getById(id) {
    this._ensureModel();
    const company = await this.Company.findById(id).exec();
    return company;
  }

  async update(id, attrs) {
    this._ensureModel();
    const updatedCompany = await this.Company.findByIdAndUpdate(id, attrs, {
      returnDocument: "after",
      runValidators: true,
    });
    return updatedCompany;
  }

  async delete(id) {
    this._ensureModel();
    const deletedCompany = await this.Company.findByIdAndDelete(id).exec();
    return deletedCompany != null;
  }

  async list(filter = {}, options = {}) {
    this._ensureModel();
    const { sort, skip, limit, select, populate, ...queryOptions } = options;
    let query = this.Company.find(filter, null, queryOptions);

    if (select) query = query.select(select);
    if (sort) query = query.sort(sort);
    if (skip != null) query = query.skip(skip);
    if (limit != null) query = query.limit(limit);
    if (populate) query = query.populate(populate);

    const rows = await query.exec();
    return rows;
  }

  async findOne(filter = {}) {
    this._ensureModel();
    const row = await this.Company.findOne(filter).exec();
    return row;
  }

  async listAll() {
    this._ensureModel();
    const rows = await this.Company.find().exec();
    return rows;
  }
}

export default CompanyService;
