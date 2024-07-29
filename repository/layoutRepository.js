const Layout = require("../models/layout");

const getAllLayouts = async () => {
  return await Layout.find();
};

const getLayoutById = async (id) => {
  return await Layout.findById(id);
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

const updateRouteInLayout = async (layoutId, routeId, updateData) => {
  return await Layout.findOneAndUpdate(
    { _id: layoutId, "routes._id": routeId },
    { $set: { "routes.$.isCurrentlyUsed": updateData.isCurrentlyUsed } },
    { new: true }
  );
};

const deleteLayout = async (id) => {
  return await Layout.findByIdAndDelete(id);
};

const addRouteToLayout = async (layoutId, routeData) => {
  return await Layout.findByIdAndUpdate(
    layoutId,
    { $push: { routes: routeData } },
    { new: true }
  );
};

const removeRouteFromLayout = async (layoutId, routeId) => {
  return await Layout.findByIdAndUpdate(
    layoutId,
    { $pull: { routes: { _id: routeId } } },
    { new: true }
  );
};

module.exports = {
  getAllLayouts,
  getLayoutById,
  createLayout,
  updateLayout,
  resetAllLayouts,
  getCurrentLayout,
  updateRouteInLayout,
  deleteLayout,
  addRouteToLayout,
  removeRouteFromLayout,
};
