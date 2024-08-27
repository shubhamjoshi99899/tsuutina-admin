const express = require("express");
const multer = require("multer");
const videoController = require("../controllers/videoController");
const router = express.Router();
const path = require("path");
const fs = require("fs");
// Set up multer storage for video files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/video";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer middleware for video upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /mp4|mkv|avi/;
    const extname = fileTypes.test(
      path?.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only video files are allowed!");
    }
  },
});

// Define the POST route for uploading videos
router.post("/upload", upload.single("video"), videoController.uploadVideo);

module.exports = router;
