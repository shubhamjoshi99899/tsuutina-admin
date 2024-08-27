const carouselRepository = require("../repository/carouselRepository");

const getAllCarousels = async () => {
  return await carouselRepository.getAllCarousels();
};

const getCarouselById = async (id) => {
  return await carouselRepository.getCarouselById(id);
};

const createCarousel = async (carouselData) => {
  return await carouselRepository.createCarousel(carouselData);
};

const setCarousel = async (id) => {
  await carouselRepository.resetAllCarousels();
  return await carouselRepository.updateCarousel(id, { isActive: true });
};

const getCurrentCarousel = async () => {
  return await carouselRepository.getCurrentCarousel();
};

const updateCarousel = async (id, updateData) => {
  return await carouselRepository.updateCarousel(id, updateData);
};

const deleteCarousel = async (id) => {
  return await carouselRepository.deleteCarousel(id);
};

const addImageToCarousel = async (carouselId, imageData) => {
  console.log(imageData);
  return await carouselRepository.addImageToCarousel(carouselId, imageData);
};

const removeImageFromCarousel = async (carouselId, imageId) => {
  return await carouselRepository.removeImageFromCarousel(carouselId, imageId);
};

module.exports = {
  getAllCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  addImageToCarousel,
  removeImageFromCarousel,
  setCarousel,
  getCurrentCarousel,
};
