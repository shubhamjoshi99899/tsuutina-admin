const express = require("express");
const layoutService = require("../services/layoutService");
const router = express.Router();

// Define controller functions
const getLayouts = async (req, res) => {
  try {
    const layouts = await layoutService.getLayouts();
    res.json(layouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLayout = async (req, res) => {
  const { name, routes } = req.body;
  try {
    const newLayout = await layoutService.createLayout({ name, routes });
    res.status(201).json(newLayout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const setLayout = async (req, res) => {
  const { id } = req.params;
  try {
    const layout = await layoutService.setLayout(id);

    if (!layout) {
      return res.status(404).json({ message: "Layout not found" });
    }

    res.json(layout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCurrentLayout = async (req, res) => {
  try {
    const layout = await layoutService.getCurrentLayout();
    res.json(layout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Define routes and attach controller functions
router.get("/", getLayouts);
router.post("/", createLayout);
router.put("/:id", setLayout);
router.get("/current", getCurrentLayout);

module.exports = router;
