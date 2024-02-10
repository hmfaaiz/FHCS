const express = require("express");
const route = express.Router();



const {
  AssignShift,UnAssignShift} = require("../controller/driverManagementC");



route.get("/", (req, res) => {
  res.send("FHCS Ambulance Driver Management")
});

route.put("/Assignshift", (req, res) => {
  AssignShift(req, res);
});


route.put("/UnAssignShift", (req, res) => {
  UnAssignShift(req, res);
});


module.exports = route;