const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  console.log(req.headers);
  res.json({ server: "up", requestDetails: { ...req.headers } });
});

module.exports = server;
