const express = require("express");
const router = express.Router();
const Organ = require("../models/Organ");

// Test Route
router.get("/test", (req, res) => {
  res.send("Organ Route Working ✅");
});

// Add Organ
router.post("/add", async (req, res) => {
  try {
    const organ = new Organ(req.body);
    await organ.save();
    res.json({ success: true, organ });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all organs
router.get("/", async (req, res) => {
  try {
    const organs = await Organ.find();
    res.json(organs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
