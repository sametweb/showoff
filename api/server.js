const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

const errorHandler = require("./middlewares/error-handler");
const authenticator = require("./middlewares/authenticator");
const projectRouter = require("./routers/project-router");
const authRouter = require("./routers/auth-router");
const userRouter = require("./routers/userpanel-router");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/auth", authRouter);
server.use("/api/userpanel", authenticator, userRouter);

server.get("/", (req, res) => {
  console.log(req.headers);
  res.json({ server: "up", requestDetails: { ...req.headers } });
});

server.use(errorHandler);

module.exports = server;
