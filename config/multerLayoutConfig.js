const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (uploadDir) => {
  if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
};

const createUpload = (directory) => {
  const storage = createStorage(directory);
  return multer({ storage: storage });
};

module.exports = createUpload('uploads/layout'); // Specify the upload directory
