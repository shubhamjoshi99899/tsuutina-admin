const Response = require("../models/response");

class ResponseRepository {
  async create(response) {
    console.log(response);
    return await Response.create(response);
  }

  async fetchCountByFormId(formId) {
    return await Response.countDocuments({ formId });
  }

  async getAllByFormId(formId) {
    return await Response.find({ formId });
  }

  async getById(id) {
    return await Response.findById(id);
  }

}

module.exports = new ResponseRepository();
