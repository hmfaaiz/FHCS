const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, default:"commonUser"},
    isAgree:{ type: String, enum: ["yes"]},
    isAdmin: { type: Boolean, default: false },
    phone: { type:String },
    city: { type: String},
   
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);