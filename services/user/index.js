const express = require("express");
const app = express();
const dotenv=require("dotenv")
dotenv.config()

const mongoose = require("mongoose");
const {connect_To_DB}=require("./databaseConfig/dbconfig");
connect_To_DB()

const cors = require("cors");

const userR=require("./route/userR")




app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());



app.use("/activeuser",userR)



app.listen(process.env.PORT, () => {
  console.log("user server is running",process.env.PORT);
});

