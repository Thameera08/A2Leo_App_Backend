const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming this is your Sequelize instance

// Define the Club model
const Club = sequelize.define('club_details', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    club_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    club_president_name: {
        type: DataTypes.STRING,
    },
    club_president_email: {
        type: DataTypes.STRING,
    },
    club_president_contact: {
        type: DataTypes.STRING,
    },
    // Add more fields as necessary for your 'clubs' table
}, {
    tableName: 'club_details', // Replace with your actual table name if different
    timestamps: false, // If your table doesn't have `createdAt` and `updatedAt` columns
});

module.exports = Club;
