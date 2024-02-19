const express = require("express");
const route = express.Router();



const {
 
    CreateRide, GetRide,AllocateRide} = require("../controller/rideC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Ride")
});

route.post("/CreateRide",(req,res)=>{
    CreateRide(req, res);
});

route.post("/GetRide",(req,res)=>{
    GetRide(req, res);
});

route.post("/AllocateRide",(req,res)=>{
    AllocateRide(req, res);
});




module.exports = route;