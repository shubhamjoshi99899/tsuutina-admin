const mongoose = require("mongoose");

const HistoryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  yearsFrom: { type: Number, required: true },
  yearsUpto: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  index: { type: Number, required: true },
  isCurrentlyVisible: { type: Boolean, default: true },
});

const HistoryItem = mongoose.model("HistoryItem", HistoryItemSchema);

module.exports = HistoryItem;
