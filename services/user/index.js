const express = require("express");
const app = express();
const dotenv=require("dotenv")
dotenv.config()

const mongoose = require("mongoose");
const {connect_To_DB}=require("./databaseConfig/dbconfig");
connect_To_DB()

const cors = require("cors");

const userR=require("./route/userR")
const patientR=require("./route/patientR")
const rideR=require("./route/rideR")



app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: `You are interacted with Micro services user `,
  });
});

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());



app.use("/activeuser",userR)
app.use("/patient",patientR)
app.use("/ride",rideR)



app.listen(process.env.PORT, () => {
  console.log("user server is running",process.env.PORT);
});

