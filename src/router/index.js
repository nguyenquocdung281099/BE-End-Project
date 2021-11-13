import express from 'express';
const appRouter = express.Router();

import AuthController from "../app/controller/AuthController"
import * as middleware from "../until/index"

appRouter.get('/', (req, res) => {
  res.send("hello bro")
});

//auth 

appRouter.post('/login', AuthController.login);
appRouter.post('/register', AuthController.register);
appRouter.get('/users', middleware.verifyAdmin, AuthController.getUser)




export default appRouter;