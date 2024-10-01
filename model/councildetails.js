const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming this is your Sequelize instance

// Define the Club model
const Council = sequelize.define('council_members', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.STRING,
    },
    // Add more fields as necessary for your 'clubs' table
}, {
    tableName: 'council_members', // Replace with your actual table name if different
    timestamps: false, // If your table doesn't have `createdAt` and `updatedAt` columns
});

module.exports = Council;
