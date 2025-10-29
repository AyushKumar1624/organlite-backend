// routes/telemetry.js
const express = require("express");
const router = express.Router();
const Telemetry = require("../models/Telemetry");

// POST telemetry (drone -> server)
router.post("/send", async (req, res) => {
  try {
    const payload = req.body;
    // require transportId and droneId at minimum
    if (!payload.transportId || !payload.droneId || payload.lat == null || payload.lon == null) {
      return res.status(400).json({ error: "transportId, droneId, lat and lon required" });
    }
    const t = await Telemetry.create({
      transportId: payload.transportId,
      droneId: payload.droneId,
      timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
      lat: payload.lat,
      lon: payload.lon,
      alt: payload.alt,
      tempC: payload.tempC,
      batteryPct: payload.batteryPct,
      raw: payload
    });
    return res.json({ success: true, data: t });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// GET latest telemetry for all drones (or filter by transportId)
router.get("/latest", async (req, res) => {
  try {
    const { transportId } = req.query;
    const match = transportId ? { transportId } : {};
    // aggregate to get latest per droneId
    const docs = await Telemetry.aggregate([
      { $match: match },
      { $sort: { droneId: 1, timestamp: -1 } },
      {
        $group: {
          _id: "$droneId",
          doc: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$doc" } }
    ]);
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/test", (req, res) => {
  res.send("Telemetry API working ✅");
});

module.exports = router;
