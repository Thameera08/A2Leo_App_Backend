const express = require("express");
const Districts = require("../controller/otherDistrict.controller"); // Assuming this function is in controllers/clubController.js


const router = express.Router();

// Define the route to get club details by ID
router.get("/", Districts.getDistrictDetails);
router.post("/", Districts.addDistrictDetails);
// router.put("/:id", upDateCouncilDetails);
// router.delete("/:id", deleteCouncilDetails);

module.exports = router;