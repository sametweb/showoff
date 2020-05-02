const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  console.log(req.headers);
  res.json({ server: "up", requestDetails: { ...req.headers } });
});

module.exports = server;
