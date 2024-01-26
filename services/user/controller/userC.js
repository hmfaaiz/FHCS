const validator = require("validator");
const { GenerateToken, Authentication } = require("../../../security/authentication");
const Admin = require("../model/admin");
const User = require("../model/user");


const RegisterUser = async (req, res) => {
  
        try {
            if (
                req.body.name &&
                req.body.email &&
                req.body.password &&
                req.body.isAgree &&
                req.body.isAgree =="yes" &&
                req.body.phone &&
                req.body.city
            ) {
                const findUser = await User.findOne({
                    email: req.body.email,
                });

                if (!findUser) {
                    const newUser = new User({
                        email: req.body.email,
                        name: req.body.name,
                        password: req.body.password,
                        isAgree: req.body.isAgree,
                        phone: req.body.phone,
                        city: req.body.city,
                    });

                    await newUser.save();
                    return res.status(200).json({
                        status: 200,
                        message: "User Successfully added",
                    });
                } else {
                    return res
                        .status(409)
                        .json({ status: 409, message: "User already exist" });
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
};


const UserSignin = async (req, res) => {
    try {
      if (
        req.body.email &&
        validator.isEmail(req.body.email) &&
        req.body.password
      ) {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const finduser = await User.findOne({ email: userEmail });
        if (finduser) {
   
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

const UpdateUser = async (req, res) => {
    Authentication(req, res, async (user) => {
        try {

            if (user._id) {
                const findUser = await User.findOne({
                    _id: user._id,
                });
                if (findUser) {
                    if (req.body.name) {
                        findUser.name = req.body.name;
                    }
                    if (req.body.email && validator.isEmail(req.body.email)) {
                        const findEmail = await User.findOne({ email: req.body.email });
                        if (findEmail) {
                            return res
                                .status(409)
                                .json({ status: 409, message: "Email already exist" });
                        } else {
                            findUser.email = req.body.email;
                        }
                    }
                    if (req.body.phone) {
                        const findPhone = await User.findOne({ phone: req.body.phone });
                        if (findPhone) {
                            return res
                                .status(409)
                                .json({ status: 409, message: "Phone already exist" });
                        } else {
                            findUser.phone = req.body.phone;
                        }
                    }
                    if (req.body.password) {
                        findUser.password = req.body.password;
                    }

                    if (req.body.city) {
                        findUser.city = req.body.city;
                    }

                    await findUser.save();
                    return res.status(200).json({
                        status: 200,
                        message: "User Successfully updated",
                        data: findUser,
                    });
                } else {
                    return res
                        .status(404)
                        .json({ status: 404, message: "User not found" });
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

const GetUser = async (req, res) => {
    Authentication(req, res, async (user) => {
        try {
            if (user.isAdmin) {
                const filter = {};
                if (req.body.userId) filter._id = req.body.userId;
                if (req.body.name) filter.name = req.body.name;
                if (req.body.email)
                    filter.email = req.body.email;
                if (req.body.phone) filter.phone = req.body.phone;
                if (req.body.city) filter.city = req.body.city;

                const findUser = await User.find(filter);
                if (findUser) {

                    const totalUser = findUser.length;

                    return res.status(200).json({
                        status: 200,
                        message: "User Successfully got",
                        data: findUser,
                        totalUser: totalUser,
                    });
                } else {
                    return res
                        .status(404)
                        .json({ status: 404, message: "User not found" });
                }
            }
            else if(!user.isAdmin){
                const findUser = await User.findOne({_id:user._id});
                if (findUser) {

                    return res.status(200).json({
                        status: 200,
                        message: "User Successfully got",
                        data: findUser
                    });
                } else {
                    return res
                        .status(404)
                        .json({ status: 404, message: "User not found" });
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

const DeleteUser = async (req, res) => {
    Authentication(req, res, async (user) => {
        try {
            if (user.isAdmin) {
                const userId = req.body.userId;

                if (!userId) {
                    return res
                        .status(400)
                        .json({ status: 400, message: "userId is required" });
                }


                else if (userId) {
                    await User.findOneAndDelete({ _id: userId });
                    return res.status(200).json({
                        status: 200,
                        message: "User Successfully Deleted",
                    });
                } else {
                    return res.status(404).json({
                        status: 404,
                        message: "User not found",
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

module.exports = { RegisterUser,UserSignin, UpdateUser, GetUser, DeleteUser }