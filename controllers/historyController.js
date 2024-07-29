const express = require("express");
const historyService = require("../services/historyService");
const router = express.Router();

const getHistoryItems = async (req, res) => {
  try {
    const items = await historyService.getAllHistoryItems();
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getHistoryItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await historyService.getHistoryItemById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "History item not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createHistoryItem = async (req, res) => {
  try {
    const newItem = await historyService.createHistoryItem(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateHistoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await historyService.updateHistoryItem(id, req.body);
    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "History item not found" });
    }
    res.json({ success: true, data: updatedItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteHistoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await historyService.deleteHistoryItem(id);
    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "History item not found" });
    }
    res.json({ success: true, message: "History item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Define routes and attach controller functions
router.get("/", getHistoryItems);
router.get("/:id", getHistoryItemById);
router.post("/", createHistoryItem);
router.put("/:id", updateHistoryItem);
router.delete("/:id", deleteHistoryItem);

module.exports = router;
