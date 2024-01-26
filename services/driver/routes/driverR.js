const express = require("express");
const route = express.Router();
const multer = require("multer");
const { storage } = require("../../../storage/storage");
const upload = multer({ storage: storage });

const {
  RegisterDriver, GetDriverProfile, UpdateDriverProfile, DriverSignin,
  DeleteDriver,} = require("../controller/driverC");



route.get("/", (req, res) => {
  res.send("FHCS Ambulance Driver")
});

route.post("/RegisterDriver",
upload.fields([{ name: "profilePic", maxCount: 1 }]), (req, res) => {
  RegisterDriver(req, res);
});

route.get("/GetDriverProfile", (req, res) => {
  GetDriverProfile(req, res);
});

route.delete("/DeleteDriver", (req, res) => {
  DeleteDriver(req, res);
});


route.put("/UpdateDriverProfile",
upload.fields([{ name: "profilePic", maxCount: 1 }]), (req, res) => {
  UpdateDriverProfile(req, res);
});

route.post("/DriverSignin", (req, res) => {
  DriverSignin(req, res);
});



module.exports = route;