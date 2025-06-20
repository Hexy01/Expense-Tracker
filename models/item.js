const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["available", "out of stock"], default: "available" },
});

module.exports = mongoose.model("Item", ItemSchema);
