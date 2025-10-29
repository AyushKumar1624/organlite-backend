const express = require("express");
const User = require("../models/User");
const router = express.Router();

// ✅ Register Hospital / Drone Operator / Admin
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/test", (req, res) => {
  res.send("✅ User API Working!");
});

module.exports = router;
