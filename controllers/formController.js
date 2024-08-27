const express = require("express");
const formService = require("../services/formService"); // Adjust the path as necessary
const router = express.Router();

const getForms = async (req, res) => {
  try {
    const forms = await formService.getAllForms();
    res.json({ success: true, data: forms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFormById = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await formService.getFormById(id);
    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }
    res.json({ success: true, data: form });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createForm = async (req, res) => {
  try {
    const newForm = await formService.createForm(req.body);
    res.status(201).json({ success: true, data: newForm });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateForm = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedForm = await formService.updateForm(id, req.body);
    if (!updatedForm) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }
    res.json({ success: true, data: updatedForm });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteForm = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await formService.deleteForm(id);
    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }
    res.json({ success: true, data: form });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const setFormAsCurrent = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await formService.setFormAsCurrent(id);
    res.json({ success: true, data: form });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const setFieldStatus = async (req, res) => {
  const { formId, fieldId } = req.params;
  try {
    const form = await formService.setFieldStatus(
      formId,
      fieldId,
      req.body.isActive
    );
    res.json({ success: true, data: form });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getCurrentForm = async (req, res) => {
  try {
    const form = await formService.getCurrentForm();
    if (form) {
      form.fields = form.fields.filter(field => field.isActive);
      res.status(200).json({ success: true, data: form });
    }
   
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

router.get("/current", getCurrentForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.post("/", createForm);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);
router.put("/setCurrent/:id", setFormAsCurrent);
router.put("/setFieldStatus/:formId/:fieldId", setFieldStatus);

module.exports = router;
