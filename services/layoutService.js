const layoutRepository = require("../repository/layoutRepository");

const getLayouts = async () => {
  return await layoutRepository.getAllLayouts();
};

const createLayout = async (layoutData) => {
  return await layoutRepository.createLayout(layoutData);
};

const setLayout = async (id) => {
  await layoutRepository.resetAllLayouts();
  return await layoutRepository.updateLayout(id, { isCurrentlySet: true });
};

const getCurrentLayout = async () => {
  return await layoutRepository.getCurrentLayout();
};

module.exports = {
  getLayouts,
  createLayout,
  setLayout,
  getCurrentLayout,
};
