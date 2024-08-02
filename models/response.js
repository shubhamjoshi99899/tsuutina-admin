const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  responses: { type: Map, of: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);
