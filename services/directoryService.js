const directoryRepository = require("../repository/directoryRepository");

const getAllDirectoryItems = async () => {
  return await directoryRepository.getAllDirectoryItems();
};

const getDirectoryItemById = async (id) => {
  return await directoryRepository.getDirectoryItemById(id);
};

const createDirectoryItem = async (data) => {
  return await directoryRepository.createDirectoryItem(data);
};

const updateDirectoryItem = async (id, data) => {
  return await directoryRepository.updateDirectoryItem(id, data);
};

const deleteDirectoryItem = async (id) => {
  return await directoryRepository.deleteDirectoryItem(id);
};

module.exports = {
  getAllDirectoryItems,
  getDirectoryItemById,
  createDirectoryItem,
  updateDirectoryItem,
  deleteDirectoryItem,
};
