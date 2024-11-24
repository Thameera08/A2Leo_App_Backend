const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otherDistrictSchema = new Schema({
    id: {
        type: String,
      },
      district: {
        type: String,
        required: true,
      },
      Officers: {
        President: {
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
        ImmPastDistrictPresident: {
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
        DistrictVicePresident: {
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
        DistrictSecretary: {
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
    
        DistrictTreasurer: {
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
        DistrictChairmanLeos: {
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
        }
      }
});

const OtherDistrict = mongoose.model("OtherDistrict", otherDistrictSchema);

module.exports = OtherDistrict;
