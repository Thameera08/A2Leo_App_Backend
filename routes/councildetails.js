const express = require("express");
const { getCouncilDetails } = require("../controller/councildetails"); // Assuming this function is in controllers/clubController.js

const router = express.Router();

// Define the route to get club details by ID
router.get("/council", getCouncilDetails);

module.exports = router;