const dotenv = require("dotenv");
dotenv.config();
const validator = require("validator");
const { GenerateToken, Authentication } = require("../../../security/authentication");
const Admin = require("../model/admin");
const Ambulance = require("../model/ambulance");
const Driver = require("../../driver/model/driver");


const AmbulanceToDriver = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
      if (user.isAdmin && req.body.driverId && req.body.ambulanceId) {
        const findDriver = await Driver.findOne({ _id: req.body.driverId });
        if (findDriver && findDriver.ambulanceId == null) {
          const findAmbulance = await Ambulance.findOne({ _id: req.body.ambulanceId });
  
          if (findAmbulance && findAmbulance.status=="Free" && findDriver.ambulanceId==null) {
            
       
            findAmbulance.driverId=findDriver._id;
            findDriver.ambulanceId = req.body.ambulanceId;
            await findDriver.save();
            findAmbulance.status="Engaged"
            await findAmbulance.save();
            return res.status(200).json({
              status: 200,
              message: "Successfully Aloocated to driver",
              data: findDriver,
            });
        } else {
            return res
              .status(404)
              .json({ status: 404, message: "Ambulance Availability not found" });
          }
         
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "Driver not found or please unassign first" });
        }
      } else {
        return res.status(403).json({
          status: 403,
          message:
            "If you are admin,so you forgot to provide driver id/ambulance Id or You are not allowed",
        });
      }
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error });
      }
    });
  };

  const AmbulanceUnassign = async (req, res) => {
    Authentication(req, res, async (user) => {
      // try {
      if (user.isAdmin && req.body.driverId) {
        const findDriver = await Driver.findOne({ _id: req.body.driverId });
        if (findDriver && findDriver.ambulanceId) {
          const findAmbulance = await Ambulance.findOne({ _id: findDriver.ambulanceId });
          if (findAmbulance) {
            findAmbulance.status = "Free";
            findAmbulance.driverId=null;
            findDriver.ambulanceId = null;

            await findDriver.save();
            await findAmbulance.save();
  
            return res.status(200).json({
              status: 200,
              message: "Ambulance Successfully unassigned",
              data: findDriver,
            });
          }else{
            return res.status(404).json({
              status: 404,
              message: "Ambulance not found"
            });
          }
        
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "Driver not found or not assigned yet" });
        }
      } else {
        return res.status(403).json({
          status: 403,
          message:
            "If you are admin,so you forgot to provide driver id or You are not allowed",
        });
      }
      // } catch (error) {
       
      //   return res
      //     .status(500)
      //     .json({ status: 500, message: "Internal error", error });
      // }
    });
  };


  
  module.exports={AmbulanceToDriver,AmbulanceUnassign}
  