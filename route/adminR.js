const express = require("express");
const route = express.Router();


const {
  AdminSignup,
  AdminSignin,
  AdminProfile,UpdateAdminProfile, }= require("../controller/adminC");

  
route.get("/", (req, res) => {
  res.send("FHCS Ambulance Admin")
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