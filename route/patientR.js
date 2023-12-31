const express = require("express");
const route = express.Router();



const {
 
    AddPatient} = require("../controller/patientC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Patient")
});

route.post("/AddPatient",(req,res)=>{
    AddPatient(req, res);
});




module.exports = route;