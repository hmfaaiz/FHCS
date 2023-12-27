const express = require("express");
const route = express.Router();



const {
 
    AddAmbulance,
    GetAllAmbulances,
    EditAmbulance,
    DeleteAmbulance} = require("../controller/ambulanceC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Ambulance")
});

route.post("/AddAmbulance",(req,res)=>{
  AddAmbulance(req, res);
});

route.post("/GetAllAmbulances", (req, res) => {
  GetAllAmbulances(req, res);
});

route.delete("/DeleteAmbulance", (req, res) => {
  DeleteAmbulance(req, res);
});


route.put("/UpdateAmbulance",(req, res) => {
  EditAmbulance(req, res);
});



module.exports = route;