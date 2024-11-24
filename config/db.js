const mongoose = require("mongoose");
//to get packages and assign into variables.

const connectDB = async () => {
  await mongoose
    .connect(process.env.Mongo_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connectDB;
