const historyRepository = require("../repository/historyRepository");

const getAllHistoryItems = async () => {
  return await historyRepository.getAllHistoryItems();
};

const getHistoryItemById = async (id) => {
  return await historyRepository.getHistoryItemById(id);
};

const createHistoryItem = async (data) => {
  return await historyRepository.createHistoryItem(data);
};

const updateHistoryItem = async (id, data) => {
  return await historyRepository.updateHistoryItem(id, data);
};

const deleteHistoryItem = async (id) => {
  return await historyRepository.deleteHistoryItem(id);
};

module.exports = {
  getAllHistoryItems,
  getHistoryItemById,
  createHistoryItem,
  updateHistoryItem,
  deleteHistoryItem,
};
