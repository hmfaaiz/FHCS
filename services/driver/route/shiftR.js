const express = require("express");
const route = express.Router();



const {
 
    AddShift,EditShift,GetShift,DeleteShift} = require("../controller/shiftC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance Shift")
});

route.post("/AddShift",(req,res)=>{
    AddShift(req, res);
});

route.put("/UpdateShift", (req, res) => {
    EditShift(req, res);
});

route.get("/GetShift", (req, res) => {
    GetShift(req, res);
});


route.delete("/DeleteShift",(req, res) => {
    DeleteShift(req, res);
});



module.exports = route;