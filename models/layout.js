const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isCurrentlyUsed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const LayoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  routes: [RouteSchema],
  isCurrentlySet: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Layout", LayoutSchema);
