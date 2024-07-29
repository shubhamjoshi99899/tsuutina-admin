const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  isVisible: { type: Boolean, default: true },
});

const CarouselSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [ImageSchema],
  isActive: { type: Boolean, default: false },
});

const Carousel = mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;
