const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('appdata', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Change if you're using a different DB like Postgres, etc.
});

module.exports = sequelize;
