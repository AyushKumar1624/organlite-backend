const express = require("express");
const Drone = require("../models/Drone");
const router = express.Router();

// ✅ Register a new drone
router.post("/register", async (req, res) => {
  try {
    const drone = await Drone.create(req.body);
    res.status(201).json({ message: "Drone registered", drone });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update drone GPS + temperature
router.put("/update/:id", async (req, res) => {
  try {
    const drone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Drone updated", drone });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all drones
router.get("/", async (req, res) => {
  try {
    const drones = await Drone.find();
    res.json(drones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
