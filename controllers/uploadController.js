const express = require("express");
const uploadService = require("../services/uploadService");
const router = express.Router();

// Handle the file upload
// In handleUpload, save the relative path instead of the full URL
const handleUpload = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // Save only the relative file path
  const filePath = `/uploads/${req.params.folder}/${req.file.filename}`;

  res.status(200).json({ success: true, filePath });
};

// Apply the upload middleware and then handle the request
router.post("/:folder", uploadService.upload.single("file"), handleUpload);

module.exports = router;
