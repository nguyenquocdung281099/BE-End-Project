import express from "express";
import connect from "./config/db";
import appRouter from "./router/index";
import cors from "cors";

import ComponentRealTime from "./app/controller/realTime";
const http = require("http");
const app = express();

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

ComponentRealTime(socketIo);
connect();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(appRouter);

app.use(express.json());

server.listen(process.env.PORT || 5555);