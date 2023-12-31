const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    shiftName: { type: String, required: true,unique: true  },
    shiftStartTime: { type: String, required: true, },
    shiftEndTime: { type: String, required: true },
    driverId: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver"
      }],
   
  },

  { timestamps: true }
);

module.exports = mongoose.model("shift", shiftSchema);