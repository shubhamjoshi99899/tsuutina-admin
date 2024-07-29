const express = require("express");
const layoutService = require("../services/layoutService");
const router = express.Router();

// Define controller functions
const getLayouts = async (req, res) => {
  try {
    const layouts = await layoutService.getLayouts();
    res.json({ success: true, data: layouts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getLayoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const layout = await layoutService.getLayoutById(id);

    if (!layout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    res.json({ success: true, data: layout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createLayout = async (req, res) => {
  const { name, routes } = req.body;
  try {
    const newLayout = await layoutService.createLayout({ name, routes });
    res.status(201).json({ success: true, data: newLayout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const setLayout = async (req, res) => {
  const { id } = req.params;
  try {
    const layout = await layoutService.setLayout(id);

    if (!layout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    res.json({ success: true, data: layout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getCurrentLayout = async (req, res) => {
  try {
    const layout = await layoutService.getCurrentLayout();
    res.json({ success: true, data: layout });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateRouteInLayout = async (req, res) => {
  const { layoutId, routeId } = req.params;
  const { isCurrentlyUsed } = req.body;

  try {
    const updatedLayout = await layoutService.updateRouteInLayout(
      layoutId,
      routeId,
      { isCurrentlyUsed }
    );

    if (!updatedLayout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout or route not found" });
    }

    res.json({ success: true, data: updatedLayout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteLayout = async (req, res) => {
  const { id } = req.params;
  try {
    const layout = await layoutService.deleteLayout(id);

    if (!layout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    res.json({ success: true, message: "Layout deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addRouteToLayout = async (req, res) => {
  const { layoutId } = req.params;
  const routeData = req.body;

  try {
    const updatedLayout = await layoutService.addRouteToLayout(
      layoutId,
      routeData
    );

    if (!updatedLayout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    res.json({ success: true, data: updatedLayout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const removeRouteFromLayout = async (req, res) => {
  const { layoutId, routeId } = req.params;

  try {
    const updatedLayout = await layoutService.removeRouteFromLayout(
      layoutId,
      routeId
    );

    if (!updatedLayout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    res.json({ success: true, data: updatedLayout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Define routes and attach controller functions
router.get("/", getLayouts);
router.get("/:id", getLayoutById);
router.post("/", createLayout);
router.put("/:id", setLayout);
router.get("/current", getCurrentLayout);
router.put("/:layoutId/routes/:routeId", updateRouteInLayout);
router.delete("/:id", deleteLayout);
router.post("/:layoutId/routes", addRouteToLayout);
router.delete("/:layoutId/routes/:routeId", removeRouteFromLayout);

module.exports = router;
