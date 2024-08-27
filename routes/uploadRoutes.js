const express = require("express");
const router = express.Router();
const uploadService = require("../services/uploadService");
const uploadController = require("../controllers/uploadController");

// Route to handle image uploads
router.post("/:folder", uploadController.handleUpload);

module.exports = router;
