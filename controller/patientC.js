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
  
  // const UpdatePatient = async (req, res) => {
  //   Authentication(req, res, async (user) => {
  //     try {
       
  //         if (req.body.patientId) {
  //           const findPatient = await Patient.findOne({
  //             _id:req.body.patientId,
  //           });
  //           if (findPatient) {
  //             if (req.body.name) {
  //               findShift.name = req.body.name;
  //             }
  //             if (req.body.age) {
  //               findShift.age = req.body.age;
  //             }
  //             if (req.body.gender) {
  //               findShift.gender = req.body.gender;
  //             }
  
  //             if (req.body.relationShipWithPatient) {
  //               findShift.relationShipWithPatient = req.body.relationShipWithPatient;
  //             }
  
  //             if (req.body.pickUpRegion) {
  //               findShift.pickUpRegion = req.body.pickUpRegion;
  //             }
  
  
  //             if (req.body.pickUpAddress) {
  //               findShift.pickUpAddress = req.body.pickUpAddress;
  //             }
  
  
  //             if (req.body.pickUpRegion) {
  //               findShift.pickUpRegion = req.body.pickUpRegion;
  //             }
  
  //             if (req.body.detinationRegion) {
  //               findShift.detinationRegion = req.body.detinationRegion;
  //             }
  
  //             if (req.body.destinationLocationUrl) {
  //               findShift.destinationLocationUrl = req.body.destinationLocationUrl;
  //             }
  
  //             if (req.body.destinationAddress) {
  //               findShift.destinationAddress = req.body.destinationAddress;
  //             }
  
  //             await findShift.save();
  //             return res.status(200).json({
  //               status: 200,
  //               message: "Shift Successfully updated",
  //               data: findShift,
  //             });
  //           } else {
  //             return res
  //               .status(404)
  //               .json({ status: 404, message: "Shift not found" });
  //           }
  //         } else {
  //           return res.status(400).json({ status: 400, message: "Invalid data" });
  //         }
        
  //     } catch (error) {
  //       console.error("Error:", error);
  //       return res
  //         .status(500)
  //         .json({ status: 500, message: "Internal error", error });
  //     }
  //   });
  // };
  

  
  module.exports={AddPatient}