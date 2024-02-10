const validator = require("validator");
const { GenerateToken, Authentication } = require("../../security/authentication");
const Shift = require("../model/shift");

//add new shift

const AddShift = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
      if (user.isAdmin) {
        if (
          req.body.shiftName &&
          req.body.shiftStartTime &&
          req.body.shiftEndTime
        ) {
          const findShift = await Shift.findOne({
            shiftName: req.body.shiftName,
          });
  
          if (!findShift) {
            const newShift = new Shift({
              shiftName: req.body.shiftName,
              shiftStartTime: req.body.shiftStartTime,
              shiftEndTime: req.body.shiftEndTime,
            });
  
            await newShift.save();
            return res.status(200).json({
              status: 200,
              message: "Shift Successfully added",
            });
          } else {
            return res
              .status(409)
              .json({ status: 409, message: "Shift already exist" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "You are not allowed" });
      }
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error });
      }
    });
  };
  
  const EditShift = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
        if (user.isAdmin) {
          if (req.query.shiftId) {
            const findShift = await Shift.findOne({
              _id: req.query.shiftId,

            });
            if (findShift) {
              if (req.body.shiftName) {
                findShift.shiftName = req.body.shiftName;
              }
              if (req.body.shiftStartTime) {
                findShift.shiftStartTime = req.body.shiftStartTime;
              }
              if (req.body.shiftEndTime) {
                findShift.shiftEndTime = req.body.shiftEndTime;
              }
  
              await findShift.save();
              return res.status(200).json({
                status: 200,
                message: "Shift Successfully updated",
                data: findShift,
              });
            } else {
              return res
                .status(404)
                .json({ status: 404, message: "Shift not found" });
            }
          } else {
            return res.status(400).json({ status: 400, message: "Invalid data" });
          }
        } else {
          return res
            .status(403)
            .json({ status: 403, message: "You are not allowed" });
        }
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error });
      }
    });
  };
  
  const GetShift = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
        if (user.isAdmin) {
          const filter = {};
          if (req.query.shiftId) filter._id = req.query.shiftId;
          if (req.body.shiftName) filter.shiftName = req.body.shiftName;
          if (req.body.shiftStartTime)
            filter.shiftStartTime = req.body.shiftStartTime;
          if (req.body.shiftEndTime) filter.shiftEndTime = req.body.shiftEndTime;
  
          const findShift = await Shift.find(filter);
          if (findShift) {
      
            console.log("findShift",findShift.driverId)
            let totaldriver = 0;
            findShift.filter((b)=>{
              totaldriver+=b.driverId.length
            })
     
            return res.status(200).json({
              status: 200,
              message: "Shift Successfully got",
              data: findShift,
              totaldriver: totaldriver,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "Shift not found" });
          }
        } else {
          return res
            .status(403)
            .json({ status: 403, message: "You are not allowed" });
        }
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error });
      }
    });
  };
  
  const DeleteShift = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
        if (user.isAdmin) {
          const shiftId = req.query.shiftId;
  
          if (!shiftId) {
            return res
              .status(400)
              .json({ status: 400, message: "ShiftID is required" });
          }
  
          const findShift = await Shift.findOne({ _id: shiftId });
  
          if (findShift && findShift.driverId.length == 0) {
            await findShift.deleteOne();
            return res.status(200).json({
              status: 200,
              message: "Shift Successfully Deleted",
            });
          } else {
            return res.status(404).json({
              status: 404,
              message: "Shift not found or It is allocated to driver(s)",
            });
          }
        } else {
          return res
            .status(403)
            .json({ status: 403, message: "You are not allowed" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error: error });
      }
    });
  };
  
  module.exports={AddShift,EditShift,GetShift,DeleteShift}