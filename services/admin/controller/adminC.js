const validator = require("validator");
const { GenerateToken, Authentication } = require("../security/authentication");
const Admin = require("../model/admin");

const AdminSignup = async (req, res) => {
  try {
    if (req.body.password && req.body.email && req.body.name) {
      const user = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      saveUser = await user.save();
      return res.status(200).json({ status: 200, message: "Added" });
    } else {
      return res.status(404).json({status:404, message: "Invalid data" });
    }
  } catch (error) {
    return res.status(500).json({status:500, message: "Internal error", error: error });
  }
};

const AdminSignin = async (req, res) => {
  try {
    if (
      req.body.email &&
      validator.isEmail(req.body.email) &&
      req.body.password
    ) {
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const finduser = await Admin.findOne({ email: userEmail });
      if (finduser) {
        try {
          if (finduser.password == userPassword) {
            const { email, name, isAdmin, ...other } = finduser;
            const forToken = {
              email,
              name,
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

const AdminProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        const finduser = await Admin.findOne({ _id: user._id });
        if (finduser) {
          return res
            .status(200)
            .json({ status: 200, message: "Admin profile", data: finduser });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "user does not exist" });
        }
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "You are not allowed" });
      }
    } catch {
      return res.status(500).json({ status: 500, message: "Internal error" });
    }
  });
};

const UpdateAdminProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        const finduser = await Admin.findOne({ _id: user._id });

        if (finduser) {
     
          if (req.body.email && validator.isEmail(req.body.email)) {
            finduser.email = req.body.email;
          }

          if (req.body.name) {
            finduser.name = req.body.name;
          }

          if (req.body.password) {
            finduser.password = req.body.password;
          }

          await finduser.save();
          return res
            .status(200)
            .json({ status: 200, message: "Profile updated successfully" });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "User does not exist" });
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



module.exports = {
  AdminSignup,
  AdminSignin,
  AdminProfile,
  UpdateAdminProfile,
};