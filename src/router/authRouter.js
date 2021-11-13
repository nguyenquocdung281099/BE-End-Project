import express from 'express';
import AuthController from "../app/controller/AuthController"
const authRouter = express.Router();


authRouter.get('/login', AuthController.login);

export default authRouter