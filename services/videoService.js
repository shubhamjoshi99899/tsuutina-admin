const fs = require("fs");
const path = require("path");

// Service to handle video saving logic
exports.saveVideo = (file, description) => {
  return new Promise((resolve, reject) => {
    try {
      const videoPath = file.path;

      // Here you can implement additional logic, like saving the data to a database
      resolve({ videoPath, description });
    } catch (error) {
      reject(error);
    }
  });
};
