const responseRepository = require("../repository/responseRepository"); // Adjust the path as necessary
const formRepository = require("../repository/formRepository");

class ResponseService {
  async createResponse(formId, responses) {
    const form = await formRepository.getById(formId);
    if (!form) {
      throw new Error("Form not found");
    }

    const mappedResponses = this.mapResponses(form, responses);
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

    console.log("24", responses.responses);
    const mappedResponses = this.mapResponses(currentForm, responses);
    return await responseRepository.create({
      formId: currentForm._id,
      responses: mappedResponses,
    });
  }

  mapResponses(form, responses) {
    const mappedResponses = {};
    const responseEntries = Object.entries(responses.responses);
    console.log(responseEntries);
    console.log(form.fields);
    form.fields.forEach((field) => {
      const fieldLabelKey = field.label.includes(" ")
        ? field.label.replace(/ /g, "_")
        : field.label;

      responseEntries.forEach(([key, value]) => {
        if (field._id?.toString() === key || fieldLabelKey === key) {
          mappedResponses[field.label] = value;
        }
      });
    });

    return mappedResponses;
  }

  async fetchCountByFormId(formId) {
    return await responseRepository.fetchCountByFormId(formId);
  }

  async getAllResponsesByFormId(formId) {
    return await responseRepository.getAllByFormId(formId);
  }

  async getResponseById(id) {
    return await responseRepository.getById(id);
  }
}

module.exports = new ResponseService();
