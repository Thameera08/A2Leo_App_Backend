const Region = require("../model/Region"); // Import the Club model

const getRegionDetails = async (req, res) => {
  try {
    const regions = await Region.find(); // Fetch all clubs (adjust if you want filtering)

    if (council.length > 0) {
      return res.status(200).json({
        Regions: regions,
      });
    } else {
      return res.status(404).json({
        message: "No Region found",
      });
    }
  } catch (error) {
    console.error("Error fetching Region details:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const addRegionDetails = async (req, res) => {
  try {
    if (req.body) {
      const region = new Region(req.body);
      await region.save()
        .then((data) => {
          res.status(200).send({ data: data });
        })
        .catch((err) => {
          console.error("Error adding Region Data:", err);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        });
    }
  } catch (err) {
    console.error("Error adding Region details:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getRegionDetails,
  addRegionDetails,
};
