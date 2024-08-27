const multer = require("multer");
const path = require("path");

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = req.params.folder;
    const destPath = path.join(__dirname, "..", "uploads", uploadFolder);
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
