const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db"); 
const clubRoutes = require("./routes/clubdetails");
const councilRoutes = require("./routes/councildetails");

require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json()); 

// Use club routes
app.use("/v1/api/club", clubRoutes);
app.use("/vi/api/district",councilRoutes);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
