const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminR=require("./route/adminR")
const driverR=require("./route/driverR")

const cors = require("cors");
const dotenv=require("dotenv")

dotenv.config()
mongoose

  .connect(process.env.DB_Url)

  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to FHCS Ambulance Service");

});

app.use("/api/fhcsambulance",adminR)

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

