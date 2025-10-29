const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema({
  droneId: { type: String, required: true, unique: true },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["available", "busy", "maintenance"],
    default: "available"
  },
  currentLocation: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  },
  temperature: {
    enabled: { type: Boolean, default: true },
    lastReading: { type: Number, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model("Drone", droneSchema);
