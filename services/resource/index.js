const express = require("express");
const app = express();
const dotenv=require("dotenv")
dotenv.config()

const mongoose = require("mongoose");
const {connect_To_DB}=require("./databaseConfig/dbconfig");
connect_To_DB()

const cors = require("cors");

const ambulanceR=require("./ambulance/route/ambulanceR")

const driverR=require("./driver/route/driverR")
const allocationR=require("./ambulance/route/ambulanceAllocateToDriverR")

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());



app.use("/ambulance",ambulanceR)
app.use("/driver",driverR)
app.use("/allocation",allocationR)


app.listen(process.env.PORT, () => {
  console.log("Ambulance & Driver server is running",process.env.PORT);
});

