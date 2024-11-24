const Council = require("../model/councildetails"); // Import the Club model

const getCouncilDetails = async (req, res) => {
  try {
    const council = await Council.find(); // Fetch all clubs (adjust if you want filtering)

    if (council.length > 0) {
      return res.status(200).json({
        councilDetails: council,
      });
    } else {
      return res.status(404).json({
        message: "No council found",
      });
    }
  } catch (error) {
    console.error("Error fetching council details:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const addCouncilDetails = async (req, res) => {
  try {
    if (req.body) {
      const councilMember = new Council(req.body);
      await councilMember
        .save()
        .then((data) => {
          res.status(200).send({ data: data });
        })
        .catch((err) => {
          console.error("Error adding club details:", err);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        });
    }
  } catch (err) {
    console.error("Error fetching council details:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const upDateCouncilDetails = async (req, res) => {
  if (req.body) {
    await Council.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.status(200).send("Council Details Updated");
      })
      .catch((err) => {
        console.error("Error fetching club details:", err);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
};

const deleteCouncilDetails = async (req, res) => {
  if (req.body) {
    await Council.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).send("Council Details deleted");
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
  getCouncilDetails,
  addCouncilDetails,
  upDateCouncilDetails,
  deleteCouncilDetails,
};
