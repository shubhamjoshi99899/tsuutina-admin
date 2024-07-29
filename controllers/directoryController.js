const express = require("express");
const directoryService = require("../services/directoryService");
const router = express.Router();

const getDirectories = async (req, res) => {
  try {
    const directories = await directoryService.getAllDirectoryItems();
    res.json({ success: true, data: directories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getDirectoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const directory = await directoryService.getDirectoryItemById(id);
    if (!directory) {
      return res
        .status(404)
        .json({ success: false, message: "Directory not found" });
    }
    res.json({ success: true, data: directory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createDirectory = async (req, res) => {
  const { name, images, address, phone, website, hours, iframe } = req.body;
  try {
    const newDirectory = await directoryService.createDirectoryItem({
      name,
      images,
      address,
      phone,
      website,
      hours,
      iframe,
    });
    res.status(201).json({ success: true, data: newDirectory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateDirectory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedDirectory = await directoryService.updateDirectoryItem(
      id,
      data
    );
    if (!updatedDirectory) {
      return res
        .status(404)
        .json({ success: false, message: "Directory not found" });
    }
    res.json({ success: true, data: updatedDirectory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteDirectory = async (req, res) => {
  const { id } = req.params;
  try {
    const directory = await directoryService.deleteDirectoryItem(id);
    if (!directory) {
      return res
        .status(404)
        .json({ success: false, message: "Directory not found" });
    }
    res.json({ success: true, data: directory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

router.get("/", getDirectories);
router.get("/:id", getDirectoryById);
router.post("/", createDirectory);
router.put("/:id", updateDirectory);
router.delete("/:id", deleteDirectory);

module.exports = router;
