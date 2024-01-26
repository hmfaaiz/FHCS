const express = require("express");
const route = express.Router();



const {
 
    AmbulanceToDriver,AmbulanceUnassign} = require("../controller/ambulanceAllocation");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Allocation")
});

route.post("/AmbulanceToDriver",(req,res)=>{
    AmbulanceToDriver(req, res);
});

route.put("/AmbulanceUnassign",(req,res)=>{
  AmbulanceUnassign(req, res);
});



module.exports = route;