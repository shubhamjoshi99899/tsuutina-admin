const express = require("express");
const carouselService = require("../services/carouselService");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/carousel");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const getCarousels = async (req, res) => {
  try {
    const carousels = await carouselService.getAllCarousels();

    const fullUrlCarousels = carousels.map((carousel) => {
      return {
        _id: carousel._id,
        title: carousel.title,
        images: carousel.images.map((image) => ({
          _id: image._id,
          url: `${req.protocol}://${req.get("host")}${image.url}`,
        })),
      };
    });
    res.json({ success: true, data: fullUrlCarousels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCurrentCarousel = async (req, res) => {
  try {
    const carousel = await carouselService.getCurrentCarousel();
    if (carousel) {
      // Dynamically build the full URL for each image
      carousel.images = carousel.images.map((image) => ({
        ...image._doc,
        url: `${req.protocol}://${req.get("host")}${image.url}`,
      }));
    }
    res.json({ success: true, data: carousel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCarouselById = async (req, res) => {
  const { id } = req.params;
  try {
    let layout;
    if (id === "current") {
      layout = await carouselService.getCurrentCarousel();
    } else {
      layout = await carouselService.getCarouselById(id);
    }

    if (!layout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    res.json({ success: true, data: layout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createCarousel = async (req, res) => {
  try {
    const { name, images } = req.body;

    // Creating the new carousel with the uploaded image URLs
    const newCarousel = await carouselService.createCarousel({ name, images });

    res.status(201).json({ success: true, data: newCarousel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const setCarousel = async (req, res) => {
  const { carouselId } = req.body;
  console.log(req.body);
  console.log(carouselId);
  try {
    const carousel = await carouselService.setCarousel(carouselId);
    if (!carousel) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel not found" });
    }
    res.json({ success: true, data: carousel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    const carousel = await carouselService.deleteCarousel(id);
    if (!carousel) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel not found" });
    }
    res.json({ success: true, message: "Carousel deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addImageToCarousel = async (req, res) => {
  console.log("first");
  const { carouselId } = req.params.id;
  console.log(req.params.id);
  try {
    const updatedCarousel = await carouselService.addImageToCarousel(
      req.params.id,
      req.body
    );
    console.log(updatedCarousel, "image");

    res.json({ success: true, data: updatedCarousel });
    console.log("second");
  } catch (err) {
    console.log(err);

    res.status(400).json({ success: false, message: err.message });
  }
};

const removeImageFromCarousel = async (req, res) => {
  const { carouselId, imageId } = req.params;
  try {
    const updatedCarousel = await carouselService.removeImageFromCarousel(
      carouselId,
      imageId
    );
    res.json({ success: true, data: updatedCarousel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Define routes and attach controller functions
router.get("/current", getCurrentCarousel);
router.get("/", getCarousels);
router.get("/:id", getCarouselById);
router.post("/", upload.array("images"), createCarousel);
router.put("/:id", setCarousel);
router.delete("/:id", deleteCarousel);
router.put("/:id/images", addImageToCarousel);
router.delete("/:carouselId/images/:imageId", removeImageFromCarousel);

module.exports = router;
