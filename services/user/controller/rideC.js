const validator = require("validator");
const { GenerateToken, Authentication } = require("../security/authentication");
const EmergencyRide = require("../model/emergencyRide");
const Patient = require("../model/patient");
// const Ambulance = require("../model/ambulance");

const CreateRide = async (req, res) => {
    Authentication(req, res, async (user) => {
        try {
            if (
                req.body.patientId &&
                req.body.startLocation

            ) {
                const newEmergencyRide = new EmergencyRide({
                    patientId: req.body.patientId,
                    startLocation: req.body.startLocation,
                    endLocation: req.body.endLocation,
                    startKm: req.body.startKm,
                    endKm: req.body.endKm,
                    isDirectRouting: req.body.isDirectRouting
                });

                await newEmergencyRide.save();
                return res.status(200).json({
                    status: 200,
                    message: "Your request is received",
                });

            } else {
                return res.status(400).json({ status: 400, message: "Invalid data" });
            }

        } catch (error) {
            console.error("Error:", error);
            return res
                .status(500)
                .json({ status: 500, message: "Internal error", error });
        }
    });
};


const GetRide = async (req, res) => {
    Authentication(req, res, async (user) => {
        try {
            const filter = {};

            if (req.body.patientId) filter.patientId = req.body.patientId;
            if (req.body.AmbulanceRegistrationNumber) filter.AmbulanceRegistrationNumber = req.body.AmbulanceRegistrationNumber;
            if (req.body.isDirectRouting) filter.isDirectRouting = req.body.isDirectRouting;
            if (req.body.date) filter.date = req.body.date;
            if (req.body.amount) filter.amount = req.body.amount;

            if (user.userRole == "commonUser") {
                filter.userId = user._id
            }


            const findEmergencyRide = await EmergencyRide.find(filter);
            console.log("findEmergencyRide", findEmergencyRide)

            if (findEmergencyRide && findEmergencyRide.length > 0) {


                return res.status(200).json({
                    status: 200,
                    message: "Emergency found",
                    data: findEmergencyRide,
                    totalEmergencyRide: findEmergencyRide.length,
                });
            } else {
                return res.status(404).json({ status: 404, message: "Not found" });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ status: 500, message: "Internal error", error: error });
        }
    });
};



// const UpdatePatient = async (req, res) => {
//     Authentication(req, res, async (EmergencyRide) => {
//         try {

//             if (req.body.patientId) {
//                 const findPatient = await Patient.findOne({
//                     _id: req.body.patientId,
//                 });
//                 if (findPatient) {
//                     if (req.body.name) {
//                         findPatient.patientInfo.name = req.body.name;
//                     }
//                     if (req.body.age) {
//                         findPatient.patientInfo.age = req.body.age;
//                     }
//                     if (req.body.gender) {
//                         findPatient.patientInfo.gender = req.body.gender;
//                     }

//                     if (req.body.relationShipWithPatient) {
//                         findPatient.patientInfo.relationShipWithPatient = req.body.relationShipWithPatient;
//                     }

//                     if (req.body.pickUpRegion) {
//                         findPatient.pickUpLocation.pickUpRegion = req.body.pickUpRegion;
//                     }


//                     if (req.body.pickUpAddress) {
//                         findPatient.pickUpLocation.pickUpAddress = req.body.pickUpAddress;
//                     }


//                     if (req.body.pickUpRegion) {
//                         findPatient.pickUpRegion = req.body.pickUpRegion;
//                     }

//                     if (req.body.detinationRegion) {
//                         findPatient.detinationLocation.detinationRegion = req.body.detinationRegion;
//                     }

//                     if (req.body.destinationLocationUrl) {
//                         findPatient.detinationLocation.destinationLocationUrl = req.body.destinationLocationUrl;
//                     }

//                     if (req.body.destinationAddress) {
//                         findPatient.detinationLocation.destinationAddress = req.body.destinationAddress;
//                     }

//                     await findPatient.save();
//                     return res.status(200).json({
//                         status: 200,
//                         message: "Patient Successfully updated",
//                         data: findPatient,
//                     });
//                 } else {
//                     return res
//                         .status(404)
//                         .json({ status: 404, message: "Patient not found" });
//                 }
//             } else {
//                 return res.status(400).json({ status: 400, message: "Invalid data" });
//             }

//         } catch (error) {
//             console.error("Error:", error);
//             return res
//                 .status(500)
//                 .json({ status: 500, message: "Internal error", error });
//         }
//     });
// };

const AllocateRide = async (req, res) => {
    Authentication(req, res, async (user, token) => {
        try {
            if (user.isAdmin) {
                let token1 = token
                if (
                    req.body.rideId &&
                    req.body.ambulanceId

                ) {
                    const axios = require('axios');

                    const apiUrl = 'http://localhost:3000/resource/ambulance/GetAllAmbulances';
                    let findAmbulance = "";

                    await axios.post(apiUrl, { AmbulanceId: req.body.ambulanceId }, { headers: { 'Authorization': `${token1}` } })
                        .then(response => {
                            findAmbulance = response.data.data[0]

                        })
                        .catch(error => {

                            return res.status(404).json({
                                status: 404,
                                message: "Ambulance Not found",
                            });
                        });



                    const findEmergencyRide = await EmergencyRide.findOne({ _id: req.body.rideId });
                    if (findEmergencyRide && findAmbulance && findAmbulance.driverId) {
                        findEmergencyRide.ambulanceId = req.body.ambulanceId
                        findEmergencyRide.driverId = findAmbulance.driverId
                        findEmergencyRide.status = "ongoing"
                        await findEmergencyRide.save()
                        return res.status(200).json({
                            status: 200,
                            message: "Ambulance is allocated for emergency",
                            data:findEmergencyRide
                        });
                    }
                    else {
                        return res.status(404).json({ status: 404, message: "Ride not found or ambulance is not attcahed with any driver" });
                    }


                } else {
                    return res.status(400).json({ status: 400, message: "Invalid data" });
                }

            } else {
                return res.status(400).json({ status: 400, message: "You are not allowed" });
            }


        } catch (error) {
            console.error("Error:", error);
            return res
                .status(500)
                .json({ status: 500, message: "Internal error", error });
        }
    });
};


module.exports = { CreateRide, GetRide, AllocateRide }