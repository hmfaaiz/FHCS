const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs").promises;
const validator = require("validator");
const { GenerateToken, Authentication } = require("../security/authentication");
const Ambulance = require("../model/ambulance");
const path = require("path");



//Ambulance
const AddAmbulance = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (
          req.body.brand &&
          req.body.model &&
          req.body.color &&
          req.body.registrationNumber &&
          req.body.numberPlate
        ) {
          const findAmbulance = await Ambulance.findOne({
            $or: [
              { registrationNumber: req.body.registrationNumber },
              { numberPlate: req.body.numberPlate },
            ],
          });


          if (!findAmbulance) {
            const newAmbulance = new Ambulance({
              registrationNumber: req.body.registrationNumber,
              brand: req.body.brand,
              model: req.body.model,
              color: req.body.color,
              numberPlate: req.body.numberPlate,
            });

            await newAmbulance.save();
            return res.status(200).json({
              status: 200,
              message: "Ambulance Successfully added",
            });
          } else {
            return res
              .status(409)
              .json({ status: 409, message: "Ambulance already exist" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const GetAllAmbulances = async (req, res) => {
  Authentication(req, res, async (user) => {
    console.log("Ambulance", req.body);
    try {
      const filter = {};
      if (req.body.registrationNumber)
        filter.registrationNumber = req.body.registrationNumber;
      if (req.body.brand) filter.brand = req.body.brand;
      if (req.body.model) filter.model = req.body.model;
      if (req.body.color) filter.color = req.body.color;
      if (req.body.status) filter.req.body.status = req.body.status;
      if (req.body.numberPlate) filter.req.body.numberPlate = req.body.nupberPlate;
      if (req.body.AmbulanceId) filter._id = req.body.AmbulanceId;
      console.log("filter", filter)
      const findAmbulance = await Ambulance.find(filter);
      let totalAmbulances;
      if (findAmbulance && findAmbulance.length > 0) {

   
        const freeAmbulance = findAmbulance.filter(
          (Ambulance) => !Ambulance.isSoftDeleted && Ambulance.driverId.length == 0
        );
        const validAmbulance = findAmbulance.filter(
          (Ambulance) => !Ambulance.isSoftDeleted  );
        let totalFreeAmbulances = freeAmbulance.length
        let totalAmbulances =validAmbulance.length

        return res.status(200).json({
          status: 200,
          message: "Ambulance found",
          data:validAmbulance,
          totalAmbulances: totalAmbulances,
          totalFreeAmbulances
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



const EditAmbulance = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (req.body.AmbulanceId) {
          const findAmbulance = await Ambulance.findOne({
            _id: req.body.AmbulanceId,
          });
          if (findAmbulance) {
            if (req.body.registrationNumber) {
              findAmbulance.registrationNumber = req.body.registrationNumber;
            }
            if (req.body.brand) {
              findAmbulance.brand = req.body.brand;
            }
            if (req.body.model) {
              findAmbulance.model = req.body.model;
            }
            if (req.body.color) {
              findAmbulance.color = req.body.color;
            }
            if (req.body.registrationNumber) {
              const findlicenseNumber = await Ambulance.findOne({
                registrationNumber: req.body.registrationNumber,
              });
              if (findlicenseNumber) {
                return res
                  .status(409)
                  .json({ status: 409, message: "Already exist" });
              } else {
                findAmbulance.registrationNumber = req.body.registrationNumber;
              }
            }
            await findAmbulance.save();
            return res.status(200).json({
              status: 200,
              message: "Ambulance Successfully updated",
              data: findAmbulance,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "Ambulance not found" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const DeleteAmbulance = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (req.body.AmbulanceId) {
          const findAmbulance = await Ambulance.findOne({
            _id: req.body.AmbulanceId,
          });

          if (findAmbulance) {
            findAmbulance.isSoftDeleted=true
            findAmbulance.save()
            return res.status(200).json({
              status: 200,
              message: "Ambulance Successfully deleted",
              deletedAmbulance: findAmbulance,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "Ambulance not found" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};




//add ride


module.exports = {

  AddAmbulance,
  GetAllAmbulances,
  EditAmbulance,
  DeleteAmbulance
};