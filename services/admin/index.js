const express = require("express");
const app = express();
const dotenv=require("dotenv")
dotenv.config()

const mongoose = require("mongoose");
const {connect_To_DB}=require("./databaseConfig/dbconfig");
connect_To_DB()

const cors = require("cors");

const adminR=require("./route/adminR")

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());



app.use("/",adminR)
// app.use("/api/fhcsambulance/driver",driverR)
// app.use("/api/fhcsambulance/driverManagement",driverManagementR)
// app.use("/api/fhcsambulance/vehicle",ambulanceR)
// app.use("/api/fhcsambulance/shift",shiftR)
// app.use("/api/fhcsambulance/user",userR)
// app.use("/api/fhcsambulance/patient",patientR)
// app.use("/api/fhcsambulance/allocation",ambulanceAllocateToDriverR)

app.listen(process.env.PORT, () => {
  console.log("Admin server is running");
});

