const validator = require("validator");
const { GenerateToken, Authentication } = require("../../../security/authentication");
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
          req.body.pickUpRegion &&
          req.body.pickUpLocationUrl &&
          req.body.detinationRegion &&
          req.body.destinationLocationUrl
        ) {
            const newPatient = new Patient({
                "patientInfo.name":req.body.name,
                "patientInfo.gender":req.body.gender,
                "patientInfo.age":req.body.age ,
                "patientInfo.relationShipWithPatient":req.body.relationShipWithPatient,
                "pickUpLocation.pickUpRegion":req.body.pickUpRegion ,
                "pickUpLocation.pickUpLocationUrl":req.body.pickUpLocationUrl,
                "detinationLocation.detinationRegion":req.body.detinationRegion,
                "detinationLocation.destinationLocationUrl":req.body.destinationLocationUrl
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
      
            const findPatient = await Patient.find();
            if (findPatient) {
          
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
         
        
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error });
      }
    });
  };
  
  const UpdatePatient = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
       
          if (req.body.patientId) {
            const findPatient = await Patient.findOne({
              _id:req.body.patientId,
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
  

  
  module.exports={AddPatient,UpdatePatient,GetPatient}