const OtherDistrict = require("../model/otherDistrict"); // Import the Club model

const getDistrictDetails = async (req, res) => {
  try {
    const OtherDistricts = await OtherDistrict.find(); // Fetch all clubs (adjust if you want filtering)

    if (council.length > 0) {
      return res.status(200).json({
        otherDistricts: OtherDistricts,
      });
    } else {
      return res.status(404).json({
        message: "No District found",
      });
    }
  } catch (error) {
    console.error("Error fetching council details:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const addDistrictDetails = async (req, res) => {
  try {
    if (req.body) {
      const District = new OtherDistrict(req.body);
      await District.save()
        .then((data) => {
          res.status(200).send({ data: data });
        })
        .catch((err) => {
          console.error("Error adding District Data:", err);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        });
    }
  } catch (err) {
    console.error("Error adding District details:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const upDateDistrictDetails = async (req, res) => {
  if (req.body) {
    await OtherDistrict.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.status(200).send("District Details Updated");
      })
      .catch((err) => {
        console.error("Error fetching District details:", err);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
};

const deleteDistrictDetails = async (req, res) => {
  if (req.body) {
    await OtherDistrict.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).send("District Details deleted");
      })
      .catch((err) => {
        console.error("Error fetching District details:", err);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
};

module.exports = {
  getDistrictDetails,
  addDistrictDetails,
  upDateDistrictDetails,
  deleteDistrictDetails,
};
