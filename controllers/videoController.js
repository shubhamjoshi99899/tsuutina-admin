const videoService = require("../services/videoService");

// Controller method for handling video uploads
exports.uploadVideo = async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const result = await videoService.saveVideo(req.file, description);

    res.status(200).json({
      message: "Video uploaded successfully!",
      videoPath: result.videoPath,
      description: result.description,
    });
  } catch (error) {
    console.log(error.message);

    res
      .status(500)

      .json({ message: "Internal server error", error: error.message });
  }
};
