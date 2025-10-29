const express = require("express");
const OrganRequest = require("../models/OrganRequest");
const Organ = require("../models/Organ");
const Drone = require("../models/Drone");
const router = express.Router();

// ✅ Request an organ by recipient hospital
router.post("/create", async (req, res) => {
  try {
    const newRequest = await OrganRequest.create(req.body);
    res.status(201).json({ message: "Request created", newRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Approve request + assign drone automatically
router.put("/approve/:id", async (req, res) => {
  try {
    const request = await OrganRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ error: "Request not found" });

    const drone = await Drone.findOne({ status: "available" });

    if (!drone) return res.status(400).json({ error: "No drone available" });

    request.status = "approved";
    request.approvalTime = new Date();
    request.droneAssigned = drone._id;

    await request.save();

    drone.status = "busy";
    await drone.save();

    const organ = await Organ.findById(request.organ);
    organ.assignedDrone = drone._id;
    organ.currentStatus = "inTransit";
    await organ.save();

    res.json({ message: "Request approved, drone assigned", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Complete organ delivery
router.put("/complete/:id", async (req, res) => {
  try {
    const request = await OrganRequest.findById(req.params.id);
    const organ = await Organ.findById(request.organ);
    const drone = await Drone.findById(request.droneAssigned);

    request.status = "completed";
    request.deliveryTime = new Date();
    await request.save();

    organ.currentStatus = "delivered";
    await organ.save();

    drone.status = "available";
    await drone.save();

    res.json({ message: "Delivery completed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
