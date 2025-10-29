// models/Telemetry.js
const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
  transportId: { type: String, required: true }, // id of transport/request/organ
  droneId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  alt: { type: Number, default: 0 },
  tempC: { type: Number, default: null },
  batteryPct: { type: Number, default: null },
  raw: { type: Object, default: {} } // optional raw payload
}, { timestamps: true });

module.exports = mongoose.model("Telemetry", telemetrySchema);
