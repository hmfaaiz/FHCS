const validator = require("validator");
const { GenerateToken, Authentication } = require("../security/authentication");
const Driver = require("../model/driver");
const Shift = require("../model/shift");



const AssignShift = async (req, res) => {
    Authentication(req, res, async (user) => {
      try {
        if (
          req.body.shiftId &&
          req.body.driverId
        ) {
            const findDriver=await Driver.findOne({_id:req.body.driverId})
            const findShift=await Shift.findOne({_id:req.body.shiftId})
            if(findDriver && findShift){
                findDriver.shiftId=req.body.shiftId
                await findDriver.save()
                return res.status(200).json({
                    status: 200,
                    message: "Shift Successfully assigned",
                  });

            }else{
                return res.status(404).json({
                    status: 404,
                    message: "Driver or Shift not found",
                  });
            }
         
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error });
      }
    });
  };


module.exports={AssignShift}