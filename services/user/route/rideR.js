const express = require("express");
const route = express.Router();



const {
 
    CreateRide, GetRide} = require("../controller/rideC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Ride")
});

route.post("/CreateRide",(req,res)=>{
    HireAmbulance(req, res);
});

route.post("/GetRide",(req,res)=>{
    GetHireAmbulance(req, res);
});




module.exports = route;