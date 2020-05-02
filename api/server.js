const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const projectRouter = require("./routers/project-router");

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  console.log(req.headers);
  res.json({ server: "up", requestDetails: { ...req.headers } });
});

module.exports = server;
