const express = require("express");
const app = express();
const gateway = require("fast-gateway");
const mongoose = require("mongoose");
const {connect_To_DB}=require("./databaseConfig/dbconfig");
connect_To_DB()
// const adminR=require("./route/adminR")
// const driverR=require("./route/driverR")
// const driverManagementR=require("./route/driverManagementR")
// const ambulanceR=require("./route/ambulanceR")
// const shiftR=require("./route/shiftR")
// const userR=require("./route/userR")
// const patientR=require("./route/patientR")
// const ambulanceAllocateToDriverR=require("./route/ambulanceAllocateToDriverR")

const cors = require("cors");


// app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

const server = gateway({
  routes: [
    {
      prefix: "/admin",
      target: "http://admin:3002/",
    },
    {
      prefix: "/driver",
      target: "http://driver:3002/",
    },
  ],
});


server.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: `You are interacted with Micro services ${process.env.PORT} ${os.hostname()}`,
  });
});

server.start(process.env.port).then((server) => {
  console.log(`Gateway is connected at ${process.env.port}`);
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

// app.listen(process.env.PORT, () => {
//   console.log("server is running");
// });

