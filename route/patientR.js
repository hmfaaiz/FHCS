const express = require("express");
const route = express.Router();



const {
 
    AddPatient,GetPatient,UpdatePatient} = require("../controller/patientC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Patient")
});

route.post("/AddPatient",(req,res)=>{
    AddPatient(req, res);
});

route.get("/GetPatient",(req,res)=>{
  GetPatient(req, res);
});

route.put("/UpdatePatient",(req,res)=>{
  UpdatePatient(req, res);
});




module.exports = route;