const Carousel = require("../models/carousel");

const getAllCarousels = async () => {
  return await Carousel.find();
};

const getCarouselById = async (id) => {
  return await Carousel.findById(id);
};

const createCarousel = async (carouselData) => {
  const carousel = new Carousel(carouselData);
  return await carousel.save();
};

const updateCarousel = async (id, updateData) => {
  return await Carousel.findByIdAndUpdate(id, updateData, { new: true });
};

const resetAllCarousels = async () => {
  return await Carousel.updateMany({}, { isActive: false });
};

const deleteCarousel = async (id) => {
  return await Carousel.findByIdAndDelete(id);
};

const getCurrentCarousel = async () => {
  return await Carousel.findOne({ isActive: true });
};

const addImageToCarousel = async (carouselId, images) => {
  console.log("33", images);
  console.log(carouselId);
  const carousel = await Carousel.findById(carouselId);
  console.log(carousel);
  carousel.images.push(...images);
  return await carousel.save();
};

const removeImageFromCarousel = async (carouselId, imageId) => {
  return await Carousel.findByIdAndUpdate(
    carouselId,
    { $pull: { images: { _id: imageId } } },
    { new: true }
  );
};

module.exports = {
  getAllCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  resetAllCarousels,
  addImageToCarousel,
  removeImageFromCarousel,
  getCurrentCarousel,
};
