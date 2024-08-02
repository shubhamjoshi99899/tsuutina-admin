// formService.js

const formRepository = require("../repository/formRepository");

class FormService {
  async createForm(form) {
    return await formRepository.create(form);
  }

  async updateForm(id, form) {
    return await formRepository.update(id, form);
  }

  async deleteForm(id) {
    return await formRepository.delete(id);
  }

  async getAllForms() {
    return await formRepository.getAll();
  }

  async getFormById(id) {
    return await formRepository.getById(id);
  }

  async setFormAsCurrent(id) {
    await formRepository.resetAll();
    return await formRepository.setAsCurrent(id);
  }

  async getCurrentForm() {
    return await formRepository.getCurrent();
  }

  async setFieldStatus(formId, fieldId, isActive) {
    return await formRepository.setFieldStatus(formId, fieldId, isActive);
  }
}

module.exports = new FormService();
