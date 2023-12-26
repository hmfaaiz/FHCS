const express = require("express");
const app = express();
const mongoose = require("mongoose");


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
  res.send("Connected");

});



app.listen(process.env.PORT, () => {
  console.log("server is running");
});