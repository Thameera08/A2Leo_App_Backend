const Club = require("../model/clubdetails"); // Import the Club model

const getClubDetails = async (req, res) => {
  try {
    const clubs = await Club.find(); // Fetch all clubs (adjust if you want filtering)

    if (clubs.length > 0) {
      return res.status(200).json({
        clubDetails: clubs,
      });
    } else {
      return res.status(404).json({
        message: "No clubs found",
      });
    }
  } catch (error) {
    console.error("Error fetching club details:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const addClubDetails = async (req, res) => {
  if (req.body) {
    const club = new Club(req.body);
    await club
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((err) => {
        console.error("Error fetching club details:", err);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
};

const upDateClubDetails = async (req, res) => {
  if (req.body) {
    await Club.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.status(200).send("Club Details Updated");
      })
      .catch((err) => {
        console.error("Error fetching club details:", err);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
};

const deleteClubDetails = async (req, res) => {
  if (req.body) {
    await Club.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).send("Club Details deleted");
      })
      .catch((err) => {
        console.error("Error fetching club details:", err);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
};

module.exports = {
  getClubDetails,
  addClubDetails,
  upDateClubDetails,
  deleteClubDetails,
};
