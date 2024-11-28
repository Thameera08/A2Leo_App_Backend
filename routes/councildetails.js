const express = require("express");
const {
  getCouncilDetails,
  addCouncilDetails,
  upDateCouncilDetails,
  deleteCouncilDetails,
} = require("../controller/councildetails"); // Assuming this function is in controllers/clubController.js

const router = express.Router();

// Define the route to get club details by ID
router.get("/", getCouncilDetails);
router.post("/", addCouncilDetails);
router.put("/:id", upDateCouncilDetails);
router.delete("/:id", deleteCouncilDetails);

module.exports = router;
