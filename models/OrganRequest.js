const mongoose = require("mongoose");

const organRequestSchema = new mongoose.Schema({
  organ: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organ",
    required: true
  },
  requesterHospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "inTransit", "completed"],
    default: "pending"
  },
  requestTime: { type: Date, default: Date.now },
  approvalTime: { type: Date, default: null },
  deliveryTime: { type: Date, default: null },
  droneAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("OrganRequest", organRequestSchema);
