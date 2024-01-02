const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true,unique: true  },
    brand: { type: String, required: true, },
    model: { type: String, required: true },
    color: { type: String, required: true },
    numberPlate:{ type: String, required: true,unique: true  },
    status:{ type: String,default:"free" },
    driverId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
        default: null
      },
   

      isSoftDeleted: { type: Boolean,default:false},

  },

  { timestamps: true }
);

module.exports = mongoose.model("ambulance", ambulanceSchema);