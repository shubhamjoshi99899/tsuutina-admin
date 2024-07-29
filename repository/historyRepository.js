const HistoryItem = require("../models/history");

const getAllHistoryItems = async () => {
  return await HistoryItem.find().sort({ index: 1 });
};

const getHistoryItemById = async (id) => {
  return await HistoryItem.findById(id);
};

const createHistoryItem = async (data) => {
  const { index } = data;
  await adjustIndexes(index, 1);
  const historyItem = new HistoryItem(data);
  return await historyItem.save();
};

const updateHistoryItem = async (id, data) => {
  const existingItem = await HistoryItem.findById(id);
  if (!existingItem) return null;

  if (existingItem.index !== data.index) {
    await adjustIndexes(data.index, 1, existingItem.index);
  }

  return await HistoryItem.findByIdAndUpdate(id, data, { new: true });
};

const deleteHistoryItem = async (id) => {
  const itemToDelete = await HistoryItem.findById(id);
  if (!itemToDelete) return null;

  await adjustIndexes(itemToDelete.index, -1);
  return await HistoryItem.findByIdAndDelete(id);
};

const adjustIndexes = async (startIndex, increment, excludeIndex = null) => {
  const items = await HistoryItem.find({
    index: {
      $gte: startIndex,
      ...(excludeIndex !== null && { $ne: excludeIndex }),
    },
  }).sort({ index: 1 });

  for (let item of items) {
    item.index += increment;
    await item.save();
  }
};

module.exports = {
  getAllHistoryItems,
  getHistoryItemById,
  createHistoryItem,
  updateHistoryItem,
  deleteHistoryItem,
};
