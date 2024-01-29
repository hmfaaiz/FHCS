const express = require("express");
const app = express();
const gateway = require("fast-gateway");
const dotenv=require("dotenv")
dotenv.config()
const os=require("os")

const cors = require("cors");
app.use(cors());
app.use(express.json());

const server = gateway({
  routes: [
    {
      prefix: "/admin",
      target: "http://localhost:3001/",
    },
    {
      prefix: "/driver",
      target: "http://localhost:3002/",
    },
    {
      prefix: "/user",
      target: "http://localhost:3003/",
    },
    {
      prefix: "/patient",
      target: "http://driver:3004/",
    },
    {
      prefix: "/ambulance",
      target: "http://localhost:3005/",
    },
    {
      prefix: "/ride",
      target: "http://localhost:3006/",
    },
  ],
});


server.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: `You are interacted with Micro services at ${process.env.PORT} ${os.hostname()}`,
  });
});

server.start(process.env.port).then((server) => {
  console.log(`Gateway is connected at ${process.env.port}`);
});

