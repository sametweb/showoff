require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

const errorHandler = require("./middlewares/error-handler");
const authenticator = require("./middlewares/authenticator");

const authRouter = require("./routers/auth-router");
const projectRouter = require("./routers/project-router");
const commentRouter = require("./routers/comment-router");
const userpanelRouter = require("./routers/userpanel-router");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/projects", projectRouter);
server.use("/api/comments", commentRouter);
server.use("/api/userpanel", authenticator, userpanelRouter);

server.get("/", (req, res) => res.json(req.headers));

server.use(errorHandler);

module.exports = server;
