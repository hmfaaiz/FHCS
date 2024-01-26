const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        patientInfo: {
            name: { type: String, required: true, },
            gender: { type: String, required: true, },
            age: { type: String, required: true },
            relationShipWithPatient: { type: String, required: true },

        },
        pickUpLocation: {
            pickUpRegion: { type: String, required: true },
            pickUpLocationUrl: { type: String, required: true },
            pickUpAddress: { type: String, }
        },
        detinationLocation: {
            detinationRegion: { type: String, required: true },
            destinationLocationUrl: { type: String, required: true },
            destinationAddress: { type: String, }
        },

        emergencyDetails: {
            emergencyType: { type: String, },
            firstAidProvided: { type: String, }
          },



    },

    { timestamps: true }
);

module.exports = mongoose.model("patient", patientSchema);