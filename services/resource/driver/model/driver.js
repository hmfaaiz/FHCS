const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    driverNumber: {
      type: String,
      required: true,
      unique: true,
    },
    ambulanceId: {
      type: String, default: null
    },
    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shift",
      default: null
    },


    isAdmin: { type: Boolean, default: false },

    profilePic: {
      type: String
    },
    userRole: {
      type: String, default: "driver"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("driver", driverSchema);