const DirectoryItem = require("../models/directory");

const getAllDirectoryItems = async (req, res) => {
  return await DirectoryItem.find();
};

const getDirectoryItemById = async (id) => {
  return await DirectoryItem.findById(id);
};

const createDirectoryItem = async (data) => {
  const directoryItem = new DirectoryItem(data);
  return await directoryItem.save();
};

const updateDirectoryItem = async (id, data) => {
  return await DirectoryItem.findByIdAndUpdate(id, data, { new: true });
};

const deleteDirectoryItem = async (id) => {
  return await DirectoryItem.findByIdAndDelete(id);
};

module.exports = {
  getAllDirectoryItems,
  getDirectoryItemById,
  createDirectoryItem,
  updateDirectoryItem,
  deleteDirectoryItem,
};
