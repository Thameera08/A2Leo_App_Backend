const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegionSchema = new Schema({
  id: {
    type: String,
  },

  region: {
    type: String,
    required: true,
  },

  regionDirector: {
    type: String,
    required: true,
  },

  Zones: [{
    
    Zone: {
      type: String,
      required: true,
    },

    ZoneDirector: {
      type: String,
      required: true,
    },

    clubs: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
  }]
});

const region = mongoose.model('region',RegionSchema);
module.exports = region;
