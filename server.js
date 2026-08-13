const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit: "10kb"}));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/location", (req, res) => {
  const { timestamp, timezone, language, latitude, longitude, accuracy_meters } = req.body;

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    typeof accuracy_meters !== "number"
  ) {
    return res.status(400).json({error: "Invalid location data"});
  }

  const record = {
    received_at: new Date().toISOString(),
    timestamp,
    timezone,
    language,
    latitude,
    longitude,
    accuracy_meters
  };

  // Replace this with your database/logging service.
  console.log("CONSENTED LOCATION:", JSON.stringify(record));

  res.json({ok: true});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
