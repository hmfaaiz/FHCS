const mongoose = require("mongoose");

const emergencyRideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    AmbulanceRegistrationNumber: {
      type:String,
    },

    startLocation: { type: String,},
      
    endLocation: {type: String },
    startKm:{type: Number },
    endKm:{type: Number },
    isDirectRouting:{type: Boolean },
     
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