const express = require("express");
const layoutService = require("../services/layoutService");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/layouts" });
// Define controller functions
const getLayouts = async (req, res) => {
  try {
    const layouts = await layoutService.getLayouts();

    // Check if layouts are found
    if (!layouts || layouts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No layouts found" });
    }

    // Construct the full URL for each route's icon in each layout
    const fullUrlLayouts = layouts.map((layout) => ({
      ...layout.toObject(), // Convert Mongoose document to a plain JS object
      routes: layout.routes.map((route) => ({
        ...route,
        icon: route.icon
          ? `${req.protocol}://${req.get("host")}${route.icon}`
          : null,
      })),
    }));

    res.json({ success: true, data: fullUrlLayouts });
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

    // Convert Mongoose document to a plain JS object
    const layoutObject = layout.toObject();

    // Construct the full URL for each route's icon
    layoutObject.routes = layoutObject.routes.map((route) => ({
      ...route,
      icon: route.icon
        ? `${req.protocol}://${req.get("host")}${route.icon}`
        : null,
    }));

    res.json({ success: true, data: layoutObject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createLayout = async (req, res) => {
  const { name } = req.body;
  let routes = [];
  console.log(req.body);

  try {
    // Parse the routes JSON string if it exists
    const newLayout = await layoutService.createLayout(req.body);

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

    if (!layout) {
      return res
        .status(404)
        .json({ success: false, message: "Layout not found" });
    }

    // Construct the full URL for each route's icon
    const fullUrlRoutes = layout.routes.map((route) => ({
      ...route,
      icon: route.icon
        ? `${req.protocol}://${req.get("host")}${route.icon}`
        : null,
    }));

    const fullLayout = {
      ...layout.toObject(), // Convert the Mongoose document to a plain JS object
      routes: fullUrlRoutes,
    };

    res.json({ success: true, data: fullLayout });
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

const addRoutesToLayout = async (req, res) => {
  const { layoutId } = req.params;
  const { routes } = req.body;

  // Validation to ensure routes array is present and not empty
  if (!routes || !Array.isArray(routes) || routes.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one route is required",
    });
  }

  // Validate each route has the required fields
  for (const route of routes) {
    if (!route.name || !route.path || !route.icon) {
      return res.status(400).json({
        success: false,
        message: "Each route must have a name, path, and icon",
      });
    }
  }

  try {
    // Get the layout by ID
    const layout = await layoutService.getLayoutById(layoutId);

    if (!layout) {
      return res.status(404).json({
        success: false,
        message: "Layout not found",
      });
    }

    // Add new routes to the layout's routes array
    layout.routes.push(...routes);

    // Save the updated layout
    const updatedLayout = await layout.save();

    // Respond with the updated layout
    res.json({ success: true, data: updatedLayout });
  } catch (err) {
    console.error("Error adding routes to layout:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while adding the routes",
      });
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
router.get("/current", getCurrentLayout);
router.get("/", getLayouts);
router.get("/:id", getLayoutById);
router.post("/", upload.any(), createLayout);
router.put("/:id", setLayout);
router.put("/:layoutId/routes/:routeId", updateRouteInLayout);
router.delete("/:id", deleteLayout);
router.post("/:layoutId/routes", addRoutesToLayout);
router.delete("/:layoutId/routes/:routeId", removeRouteFromLayout);

module.exports = router;
