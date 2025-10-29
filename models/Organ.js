const mongoose = require("mongoose");

const OrganSchema = new mongoose.Schema({
    organType: String,
    bloodGroup: String,
    harvestTime: Date,
    preservationMethod: String,
    viabilityWindow: Number,
    status: { type: String, default: "Available" }
}, { timestamps: true });

module.exports = mongoose.model("Organ", OrganSchema);
