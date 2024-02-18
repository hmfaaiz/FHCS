const validator = require("validator");
const { GenerateToken, Authentication } = require("../security/authentication");
const User = require("../model/user");
const Patient = require("../model/patient");


const AddPatient = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (
        req.body.name &&
        req.body.gender &&
        req.body.age &&
        req.body.relationShipWithPatient &&
        req.body.emergencyType
      ) {
        const newPatient = new Patient({
          "patientInfo.name": req.body.name,
          "patientInfo.gender": req.body.gender,
          "patientInfo.age": req.body.age,
          "patientInfo.relationShipWithPatient": req.body.relationShipWithPatient,
          "emergencyDetails.emergencyType": req.body.emergencyType,
          "emergencyDetails.firstAidProvided": req.body.firstAidProvided,
          userId: user._id
        });

        await newPatient.save();
        return res.status(200).json({
          status: 200,
          message: "Patient Successfully added",
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


const GetPatient = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      const filter = {};

      if (req.body.name) filter.patientInfo.name = req.body.name;
      if (req.body.gender) filter.patientInfo.gender = req.body.gender;
      if (req.body.age) filter.patientInfo.age = req.body.age;
      if (req.body.relationShipWithPatient) filter.patientInfo.relationShipWithPatient = req.body.name;
      if (req.body.emergencyType) filter.emergencyDetails.emergencyType = req.body.emergencyType;
      if (req.body.firstAidProvided) filter.emergencyDetails.firstAidProvided = req.body.firstAidProvided;
      if (user.userRole == "commonUser") {
        filter.userId = user._id
      }


      const findPatient = await Patient.find(filter);
      console.log("findPatient",findPatient)
      let totalPatient = 0;
      if (findPatient && findPatient.length > 0) {


        return res.status(200).json({
          status: 200,
          message: "Patient found",
          data: findPatient,
          totalPatient: findPatient.length,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal error 2", error: error });
    }
  });
};

const UpdatePatient = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {

      if (req.body.patientId) {
        const findPatient = await Patient.findOne({
          _id: req.body.patientId,
        });
        if (findPatient) {
          if (req.body.name) {
            findPatient.patientInfo.name = req.body.name;
          }
          if (req.body.age) {
            findPatient.patientInfo.age = req.body.age;
          }
          if (req.body.gender) {
            findPatient.patientInfo.gender = req.body.gender;
          }

          if (req.body.relationShipWithPatient) {
            findPatient.patientInfo.relationShipWithPatient = req.body.relationShipWithPatient;
          }

          if (req.body.pickUpRegion) {
            findPatient.pickUpLocation.pickUpRegion = req.body.pickUpRegion;
          }


          if (req.body.pickUpAddress) {
            findPatient.pickUpLocation.pickUpAddress = req.body.pickUpAddress;
          }


          if (req.body.pickUpRegion) {
            findPatient.pickUpRegion = req.body.pickUpRegion;
          }

          if (req.body.detinationRegion) {
            findPatient.detinationLocation.detinationRegion = req.body.detinationRegion;
          }

          if (req.body.destinationLocationUrl) {
            findPatient.detinationLocation.destinationLocationUrl = req.body.destinationLocationUrl;
          }

          if (req.body.destinationAddress) {
            findPatient.detinationLocation.destinationAddress = req.body.destinationAddress;
          }

          await findPatient.save();
          return res.status(200).json({
            status: 200,
            message: "Patient Successfully updated",
            data: findPatient,
          });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "Patient not found" });
        }
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



module.exports = { AddPatient, UpdatePatient, GetPatient }