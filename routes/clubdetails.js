const express = require("express");
const {
  getClubDetails,
  addClubDetails,
  upDateClubDetais,
  deleteClubDetais,
  upDateClubDetails,
  deleteClubDetails,
} = require("../controller/clubdetails"); // Assuming this function is in controllers/clubController.js

const router = express.Router();

// Define the route to get club details by ID
router.get("/", getClubDetails);
router.post("/", addClubDetails);
router.put("/:id", upDateClubDetails);
router.delete("/:id", deleteClubDetails);
module.exports = router;
