const express = require("express");
const Region = require("../controller/Region.controller"); // Assuming this function is in controllers/clubController.js

const router = express.Router();

// Define the route to get club details by ID
router.get("/", Region.addRegionDetails);
router.post("/", Region.addRegionDetails);
// router.put("/:id", upDateCouncilDetails);
// router.delete("/:id", deleteCouncilDetails);

module.exports = router;
