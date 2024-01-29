const express = require("express");
const route = express.Router();
const os=require("os")
const dotenv=require("dotenv")
dotenv.config()

const {
  AdminSignup,
  AdminSignin,
  AdminProfile,UpdateAdminProfile, }= require("../controller/adminC");

  
route.get("/", (req, res) => {
    return res.send({
      status: 200,
      message: `You are interacted with admin Micro services at ${process.env.PORT} ${os.hostname()}`,
    });
  });
  
  route.post("/signup", (req, res) => {
    AdminSignup(req, res);
  });
  route.post("/Signin", (req, res) => {
    AdminSignin(req, res);
  });
  route.get("/AdminProfile", (req, res) => {
    AdminProfile(req, res);
  });
  
  route.put("/UpdateAdminProfile", (req, res) => {
    UpdateAdminProfile(req, res);
  });
  
 
  
  module.exports = route;