const express = require("express");
const app = express();
const dotenv=require("dotenv")
dotenv.config()
const os=require("os")
// const mongoose = require("mongoose");
// const {connect_To_DB}=require("./databaseConfig/dbconfig");
// connect_To_DB()

const cors = require("cors");


// app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: `You are interacted with admin Micro services at ${process.env.PORT} ${os.hostname()}`,
  });
});



// app.get("/", (req, res) => {
//   res.send("Welcome to FHCS Ambulance Service");

// });

// app.use("/api/fhcsambulance",adminR)
// app.use("/api/fhcsambulance/driver",driverR)
// app.use("/api/fhcsambulance/driverManagement",driverManagementR)
// app.use("/api/fhcsambulance/vehicle",ambulanceR)
// app.use("/api/fhcsambulance/shift",shiftR)
// app.use("/api/fhcsambulance/user",userR)
// app.use("/api/fhcsambulance/patient",patientR)
// app.use("/api/fhcsambulance/allocation",ambulanceAllocateToDriverR)

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

