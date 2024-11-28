const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CLubsschema = new Schema({
  id: {
    type: String,
  },
  club_name: {
    type: String,
    required: true,
  },
  Officers: {
    clubPresident: {
      name: {
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
    },
    VicePresident: {
      name: {
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
    },
    Secretary: {
      name: {
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
    },

    Treasurer: {
      name: {
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
    },
    Advisor: {
      name: {
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
    },
    StaffAdvisor: {
      name: {
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
    },
  },
});

const Club = mongoose.model("Club", CLubsschema);

module.exports = Club;
