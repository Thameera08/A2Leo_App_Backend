const Club = require('../model/clubdetails'); // Import the Club model

const getClubDetails = async (req, res) => {
    try {
        const clubs = await Club.findAll(); // Fetch all clubs (adjust if you want filtering)
        
        if (clubs.length > 0) {
            return res.status(200).json({
                clubDetails: clubs
            });
        } else {
            return res.status(404).json({
                message: 'No clubs found'
            });
        }
    } catch (error) {
        console.error('Error fetching club details:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

module.exports = { getClubDetails };
