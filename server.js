require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const organRoutes = require("./routes/organs");
const telemetryRoutes = require("./routes/telemetry"); // ✅ Fixed

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("OrganLink Backend Running ✅");
});

app.use("/api/organs", organRoutes);
app.use("/api/telemetry", telemetryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on PORT ${PORT}`));
