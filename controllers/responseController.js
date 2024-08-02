const express = require("express");
const responseService = require("../services/responseService"); // Adjust the path as necessary
const router = express.Router();

const createResponse = async (req, res) => {
  const { formId, ...responses } = req.body;
  try {
    const response = await responseService.createResponse(formId, responses);
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createResponseForCurrentForm = async (req, res) => {
  try {
    const response = await responseService.createResponseForCurrentForm(
      req.body
    );
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllResponsesByFormId = async (req, res) => {
  const { formId } = req.params;
  try {
    const responses = await responseService.getAllResponsesByFormId(formId);
    res.status(200).json({ success: true, data: responses });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getResponseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await responseService.getResponseById(id);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Response not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

router.post("/", createResponse);
router.post("/current", createResponseForCurrentForm);
router.get("/form/:formId", getAllResponsesByFormId);
router.get("/:id", getResponseById);

module.exports = router;
