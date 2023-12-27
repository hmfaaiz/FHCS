const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true},
   
    mobile: {
        type: String,
        required: true},
   
    cv: {
        type: String},
   
   
    applicationStatus: {
      type: String,
      enum: ["rejected", "approved", "called","pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("job", jobSchema);