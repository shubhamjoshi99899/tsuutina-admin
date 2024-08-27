const express = require("express");
const directoryService = require("../services/directoryService");
const router = express.Router();

const getDirectory = async (req, res, next) => {
  try {
    const directory = await directoryService.getAllDirectoryItems();
    res.json({ success: true, data: directory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createDirectory = async (req, res, next) => {
  try {
    const newDirectory = await directoryService.createDirectoryItem(req.body);
    res.status(201).json({ success: true, data: newDirectory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getDirectoryItem = async (req, res, next) => {
  try {
    const directoryItem = await directoryService.getDirectoryItemById(
      req.params.id
    );
    if (!directoryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Directory item not found" });
    }
    res.json({ success: true, data: directoryItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateDirectoryItem = async (req, res, next) => {
  try {
    const updatedDirectoryItem = await directoryService.updateDirectoryItem(
      req.params.id,
      req.body
    );
    if (!updatedDirectoryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Directory item not found" });
    }
    res.json({ success: true, data: updatedDirectoryItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteDirectory = async (req, res, next) => {
  try {
    const deletedDirectory = await directoryService.deleteDirectoryItem(
      req.params.id
    );
    if (!deletedDirectory) {
      return res
        .status(404)
        .json({ success: false, message: "Directory item not found" });
    }
    res.json({ success: true, message: "Directory item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

router.get("/", getDirectory);
router.post("/", createDirectory);
router.delete("/", deleteDirectory);
router.put("/:id", updateDirectoryItem);
router.get("/:id", getDirectoryItem);

module.exports = router;
