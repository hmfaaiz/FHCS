const express = require("express");
const route = express.Router();



const {
 
    AmbulanceToDriver} = require("../controller/ambulanceAllocation");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Allocation")
});

route.post("/AmbulanceToDriver",(req,res)=>{
    AmbulanceToDriver(req, res);
});



module.exports = route;