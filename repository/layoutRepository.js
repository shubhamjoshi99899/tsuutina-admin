const Layout = require("../models/layout");

const getAllLayouts = async () => {
  return await Layout.find();
};

const createLayout = async (layoutData) => {
  const layout = new Layout(layoutData);
  return await layout.save();
};

const updateLayout = async (id, updateData) => {
  return await Layout.findByIdAndUpdate(id, updateData, { new: true });
};

const resetAllLayouts = async () => {
  return await Layout.updateMany({}, { isCurrentlySet: false });
};

const getCurrentLayout = async () => {
  return await Layout.findOne({ isCurrentlySet: true });
};

module.exports = {
  getAllLayouts,
  createLayout,
  updateLayout,
  resetAllLayouts,
  getCurrentLayout,
};
