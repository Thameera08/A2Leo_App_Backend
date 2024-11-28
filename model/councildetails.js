const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CouncillSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const Councill = mongoose.model("Council", CouncillSchema);

module.exports = Councill;
