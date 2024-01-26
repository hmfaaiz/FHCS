const validator = require("validator");
const { GenerateToken, Authentication } = require("../../../security/authentication");
const Driver = require("../model/driver");


const RegisterDriver = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (
          req.body.firstName &&
          req.body.lastName &&
          req.body.mobileNumber &&
          req.body.address &&
          req.body.email &&
          validator.isEmail(req.body.email) &&
          req.body.postalCode &&
          req.body.driverNumber
        
        ) {
          const findDriver = await Driver.findOne({
            $or: [
              { driverNumber: req.body.driverNumber },
              { email: req.body.email },
            ],
          });

          if (!findDriver) {
            const characters =
              "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            let randomString = "";
            let length = 10;

            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomString += characters.charAt(randomIndex);
            }
            console.log(randomString);
            const newDriver = new Driver({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              mobileNumber: req.body.mobileNumber,
              address: req.body.address,
              email: req.body.email,
              postalCode: req.body.postalCode,
              driverNumber: req.body.driverNumber,
              password: randomString,
            });

            if (req.files && req.files["profilePic"]) {
        
              newDriver.profilePic = req.files["profilePic"][0].path;
            }

            await newDriver.save();
            data = {
              email: newDriver.email,
              password: newDriver.password,
            };
            return res.status(200).json({
              status: 200,
              message: "Driver Successfully added",
              data: data,
            });
          } else {
            return res
              .status(409)
              .json({ status: 409, message: "Driver already exist" });
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

const GetDriverProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      const filter={}

        if(user.isAdmin && req.body.driverId) filter._id = req.body.driverId;
        if(user.isAdmin && req.body.firstName) filter.firstName = req.body.firstName;
        if(user.isAdmin && req.body.lastName) filter.lastName = req.body.lastName;
        if(user.isAdmin && req.body.email) filter.email = req.body.email;
        if(user.isAdmin && req.body.driverNumber) filter.driverNumber = req.body.driverNumber;
        if(!user.isAdmin ) filter._id = user._id;
        if (req.body.shiftName) filterShiftName = req.body.shiftName;
        
        const findDriver = await Driver.find(filter)
        .populate({
          path:"shiftId",
       
          select:("shiftName shiftStartTime shiftEndTime")
        });
        if (findDriver) {
          let totalDriver=0
          totalDriver = findDriver.length;
          return res.status(200).json({
            status: 200,
            message: "Driver Profile",
            data: findDriver,
            totalDriver:totalDriver,
          });
          
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "Driver not found" });
        }
  
    
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const UpdateDriverProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    console.log("Updating")
    try {
      if ((user.isAdmin && req.query.driverId) || !user.isAdmin) {
        let driverId =user._id;
        if(user.isAdmin && req.query.driverId){
          driverId = req.query.driverId;
        }
        const findDriver = await Driver.findOne({ _id: driverId });
        if (findDriver) {
          if (req.body.firstName) {
            findDriver.firstName = req.body.firstName;
          }
          if (req.body.lastName) {
            findDriver.lastName = req.body.lastName;
          }
          if (req.body.mobileNumber) {
            findDriver.mobileNumber = req.body.mobileNumber;
          }
          if (req.body.email && validator.isEmail(req.body.email)) {
            const findEmail = await Driver.findOne({ email: req.body.email });
            if (findEmail) {
              return res
                .status(409)
                .json({ status: 409, message: "Email already exist" });
            } else {
              findDriver.email = req.body.email;
            }
          }
          if (req.body.password) {
            findDriver.password = req.body.password;
          }
          if (req.body.postalCode) {
            findDriver.postalCode = req.body.postalCode;
          }
          if (req.body.address) {
            findDriver.address = req.body.address;
          }
          if (req.body.driverNumber) {
            const findlicenseNumber = await Driver.findOne({
              driverNumber: req.body.driverNumber,
            });
            if (findlicenseNumber) {
              return res
                .status(409)
                .json({ status: 409, message: "License Number already exist" });
            } else {
              findDriver.licenseNumber = req.body.licenseNumber;
            }
          }
          if (req.files && req.files["profilePic"]) {
            console.log("profile pic update")
            findDriver.profilePic = req.files["profilePic"][0].path;
          }

          await findDriver.save();
          return res.status(200).json({
            status: 200,
            message: "Driver Successfully updated",
            data: findDriver,
          });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "Driver not found" });
        }
      } else {
        return res.status(403).json({
          status: 403,
          message:
            "If you are admin,so you forgot to provide driver id or You are not allowed",
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

const DeleteDriver = (req, res) => {
  Authentication(req, res, async (user) => {

    try {
      if (!user.isAdmin) {
        return res
          .status(404)
          .json({ "status": 404, message: "You are not authorized to delete Guidance" });
      }
      if (req.query.driverId) {
        try {
          const driverId = req.query.driverId; // Assuming you pass the podcast ID in the request parameters
          const driver = await Driver.findOneAndDelete({ _id: driverId });

          if (!driver) {
            return res.status(404).json({ "status": 404, message: "driver not found." });
          }
          return res
            .status(200)
            .json({ "status": 200, message: "driver deleted successfully." });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ "status": 500, message: "Internal Server Error" });
        }
      } else {
        return res.status(404).json({ "status": 404, message: "Invalid request" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};




const DriverSignin = async (req, res) => {
  try {
    if (
      req.body.email &&
      validator.isEmail(req.body.email) &&
      req.body.password
    ) {
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const finduser = await Driver.findOne({ email: userEmail });
      console.log(finduser, req.body.email);
      if (finduser) {
        try {
          if (finduser.password == userPassword) {
            const { email, firstName, isAdmin, ...other } = finduser;
            const forToken = {
              email,
              firstName,
              isAdmin,
              _id: finduser._id,
            };
            await GenerateToken(forToken, res);
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "password is wrong" });
          }
        } catch {
          return res
            .status(500)
            .json({ status: 500, message: "Internal error" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "user does not exist" });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "please enter your credentials" });
    }
  } catch {
    return res.status(500).json({ status: 500, message: "Internal error" });
  }
};

module.exports = {
  RegisterDriver,
  GetDriverProfile,
  UpdateDriverProfile,
  DriverSignin,
 DeleteDriver,
};