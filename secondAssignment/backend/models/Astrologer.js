const mongoose = require("mongoose");

const astrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentLoad: { type: Number, default: 0 },
  isTop: { type: Boolean, default: false },
});

module.exports = mongoose.model("Astrologer", astrologerSchema);
