const Council = require('../model/councildetails'); // Import the Club model

const getCouncilDetails = async (req, res) => {
    try {
        const council = await Council.findAll(); // Fetch all clubs (adjust if you want filtering)
        
        if (council.length > 0) {
            return res.status(200).json({
                message: 'Council details fetched successfully',
                councilDetails: council
            });
        } else {
            return res.status(404).json({
                message: 'No council found'
            });
        }
    } catch (error) {
        console.error('Error fetching council details:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

module.exports = { getCouncilDetails };
