import express from "express";
import connect from "./config/db/index";
import appRouter from "./router/index";
import cors from "cors";

const app = express();
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

app.listen(process.env.PORT || 5555);
