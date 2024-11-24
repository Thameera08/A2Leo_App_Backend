const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const clubRoutes = require("./routes/clubdetails");
const councilRoutes = require("./routes/councildetails");
const regionRoutes = require("./routes/region.route");
const otherDistrictRoutes = require("./routes/otherDistrict.route");

require("dotenv").config();

const app = express();
connectDB();
// Middleware
app.use(bodyParser.json());

// Use club routes
app.use("/v1/api/club", clubRoutes);
app.use("/v1/api/district", councilRoutes);
app.use("/v1/api/region", regionRoutes);
app.use("/v1/api/otherdistrict", otherDistrictRoutes);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
