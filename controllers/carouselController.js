const express = require("express");
const carouselService = require("../services/carouselService");
const router = express.Router();

const getCarousels = async (req, res) => {
  try {
    const carousels = await carouselService.getAllCarousels();
    res.json({ success: true, data: carousels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCarouselById = async (req, res) => {
  const { id } = req.params;
  try {
    const carousel = await carouselService.getCarouselById(id);
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

const createCarousel = async (req, res) => {
  const { name, images } = req.body;
  try {
    const newCarousel = await carouselService.createCarousel({ name, images });
    res.status(201).json({ success: true, data: newCarousel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const setCarousel = async (req, res) => {
  const { carouselId } = req.params;
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

const getCurrentCarousel = async (req, res) => {
  try {
    const carousel = await carouselService.getCurrentCarousel();
    res.json({ success: true, data: carousel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCarousel = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedCarousel = await carouselService.updateCarousel(
      id,
      updateData
    );
    if (!updatedCarousel) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel not found" });
    }
    res.json({ success: true, data: updatedCarousel });
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
  const { carouselId } = req.params;
  const imageData = req.body;
  try {
    const updatedCarousel = await carouselService.addImageToCarousel(
      carouselId,
      imageData
    );
    res.json({ success: true, data: updatedCarousel });
  } catch (err) {
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
router.post("/", createCarousel);
router.put("/:id", updateCarousel);
router.delete("/:id", deleteCarousel);
router.get("/current", getCurrentCarousel);
router.post("/:carouselId/images", addImageToCarousel);
router.put("/:carouselId/set", setCarousel);
router.delete("/:carouselId/images/:imageId", removeImageFromCarousel);

module.exports = router;
