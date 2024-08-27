const { default: mongoose } = require("mongoose");

const DirectorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  hours: { type: String, required: true },
});

const Directory = mongoose.model("Directory", DirectorySchema);

module.exports = Directory;
