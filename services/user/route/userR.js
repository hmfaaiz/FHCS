const express = require("express");
const route = express.Router();



const {
 
    RegisterUser,UserSignin, UpdateUser, GetUser, DeleteUser } = require("../controller/userC");



route.get("/", (req, res) => {
  
  res.send("FHCS Ambulance User")
});

route.post("/RegisterUser",(req,res)=>{
    RegisterUser(req, res);
});

route.post("/UserSignin",(req,res)=>{
    UserSignin(req, res);
});

route.put("/UpdateUser", (req, res) => {
    UpdateUser(req, res);
});

route.get("/GetUser", (req, res) => {
    GetUser(req, res);
});


route.delete("/DeleteUser",(req, res) => {
    DeleteUser(req, res);
});



module.exports = route;