const mongoose = require("mongoose");

const emergencyRideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
    },
    AmbulanceRegistrationNumberd: {
      type:String,
    },

    startLocation: { type: String,},
      
    endLocation: {type: String },
     
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    amount: {
      type: Number,
      required: true,
    },
   
    status: {
      type: String,
      enum: ["ongoing", "completed", "canceled", "pending"],
      default: "ongoing",
    },

   
  },
  { timestamps: true }
);


module.exports =mongoose.model("emergencyRide", emergencyRideSchema);