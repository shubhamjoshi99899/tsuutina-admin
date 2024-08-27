const layoutRepository = require("../repository/layoutRepository");

const getLayouts = async () => {
  return await layoutRepository.getAllLayouts();
};

const getLayoutById = async (id) => {
  return await layoutRepository.getLayoutById(id);
};

const createLayout = async (layoutData) => {
  console.log("12", layoutData);
  return await layoutRepository.createLayout(layoutData);
};

const setLayout = async (id) => {
  await layoutRepository.resetAllLayouts();
  return await layoutRepository.updateLayout(id, { isCurrentlySet: true });
};

const getCurrentLayout = async () => {
  return await layoutRepository.getCurrentLayout();
};

const updateRouteInLayout = async (layoutId, routeId, updateData) => {
  return await layoutRepository.updateRouteInLayout(
    layoutId,
    routeId,
    updateData
  );
};

const deleteLayout = async (id) => {
  return await layoutRepository.deleteLayout(id);
};

const addRouteToLayout = async (layoutId, routeData) => {
  return await layoutRepository.addRouteToLayout(layoutId, routeData);
};

const removeRouteFromLayout = async (layoutId, routeId) => {
  return await layoutRepository.removeRouteFromLayout(layoutId, routeId);
};

module.exports = {
  getLayouts,
  getLayoutById,
  createLayout,
  setLayout,
  getCurrentLayout,
  updateRouteInLayout,
  deleteLayout,
  addRouteToLayout,
  removeRouteFromLayout,
};
