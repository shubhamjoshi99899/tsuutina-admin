const responseRepository = require("../repository/responseRepository"); // Adjust the path as necessary
const formRepository = require("../repository/formRepository");

class ResponseService {
  async createResponse(formId, responses) {
    const form = await formRepository.getById(formId);
    if (!form) {
      throw new Error("Form not found");
    }

    const mappedResponses = this.mapResponses(form, responses);
    console.log("Mapped Responses:", mappedResponses);
    return await responseRepository.create({
      formId,
      responses: mappedResponses,
    });
  }

  async createResponseForCurrentForm(responses) {
    const currentForm = await formRepository.getCurrent();
    if (!currentForm) {
      throw new Error("No active form found");
    }

    const mappedResponses = this.mapResponses(currentForm, responses);
    console.log("Mapped Responses:", mappedResponses);
    return await responseRepository.create({
      formId: currentForm._id,
      responses: mappedResponses,
    });
  }

  mapResponses(form, responses) {
    const mappedResponses = {};
    console.log("responses", responses, "form", form);
    form.fields.forEach((field) => {
      if (responses[field.label] !== undefined) {
        mappedResponses[field.label] = responses[field.label];
      }
    });
    return mappedResponses;
  }

  async getAllResponsesByFormId(formId) {
    return await responseRepository.getAllByFormId(formId);
  }

  async getResponseById(id) {
    return await responseRepository.getById(id);
  }
}

module.exports = new ResponseService();
