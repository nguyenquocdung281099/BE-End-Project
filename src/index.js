import express from 'express';
import connect from './config/db';
import bodyParser from 'body-parser';
import appRouter from "./router/index"
import cors from "cors"

const app = express();
connect()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())

app.use(appRouter);

app.use(express.json())

app.listen(3000, () => console.log('server is running in port 3000'));