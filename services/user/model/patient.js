const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        patientInfo: {
            name: { type: String, required: true, },
            gender: { type: String, required: true, },
            age: { type: String, required: true },
            relationShipWithPatient: { type: String, required: true },

        },

        emergencyDetails: {
            emergencyType: { type: String, },
            firstAidProvided: { type: String, }
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },

    },

    { timestamps: true }
);

module.exports = mongoose.model("patient", patientSchema);