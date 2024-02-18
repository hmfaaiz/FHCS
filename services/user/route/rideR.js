const express = require("express");
const route = express.Router();



const {
 
    HireAmbulance, GetHireAmbulance} = require("../controller/rideC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Ride")
});

route.post("/HireAmbulance",(req,res)=>{
    HireAmbulance(req, res);
});

route.post("/GetHireAmbulance",(req,res)=>{
    GetHireAmbulance(req, res);
});




module.exports = route;