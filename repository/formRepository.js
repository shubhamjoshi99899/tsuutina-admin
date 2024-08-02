// formRepository.js

const Form = require("../models/form"); // Adjust the path as necessary

class FormRepository {
  async create(form) {
    return await Form.create(form);
  }

  async update(id, form) {
    return await Form.findByIdAndUpdate(id, form, { new: true });
  }

  async delete(id) {
    return await Form.findByIdAndDelete(id);
  }

  async getAll() {
    return await Form.find();
  }

  async getById(id) {
    return await Form.findById(id);
  }

  async resetAll() {
    return await Form.updateMany({}, { isActive: false });
  }

  async setAsCurrent(id) {
    await Form.updateMany({}, { $set: { isActive: false } });
    return await Form.findByIdAndUpdate(id, { isActive: true }, { new: true });
  }

  async getCurrent() {
    return await Form.findOne({ isActive: true });
  }

  async setFieldStatus(formId, fieldId, isActive) {
    return await Form.findOneAndUpdate(
      { _id: formId, "fields._id": fieldId },
      { $set: { "fields.$.isActive": isActive } },
      { new: true }
    );
  }
}

module.exports = new FormRepository();
