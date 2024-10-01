const express = require("express");
const { getClubDetails } = require("../controller/clubdetails"); // Assuming this function is in controllers/clubController.js

const router = express.Router();

// Define the route to get club details by ID
router.get("/clubs", getClubDetails);

module.exports = router;
