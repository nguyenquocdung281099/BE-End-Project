import express from "express";
const appRouter = express.Router();

import AuthController from "../app/controller/AuthController";
import BookingController from "../app/controller/BookingController";
import ExtraServiceController from "../app/controller/ExtraServiceController";
import ProductController from "../app/controller/ProductController";
import PromotionController from "../app/controller/PromotionController";
import RoomController from "../app/controller/RoomController";
import * as middleware from "../until/index";

appRouter.get("/", (req, res) => {
  res.send("hello bro");
});

//auth

appRouter.post("/login", AuthController.login);
appRouter.post("/register", AuthController.register);
appRouter.get("/users", middleware.verifyAdmin, AuthController.getUser);
appRouter.get("/usersTest", middleware.verifyAuth, AuthController.getUser);
appRouter.post("/refreshToken", AuthController.refreshToken);
appRouter.post("/userCurrent", AuthController.getCurrentUser);
appRouter.put("/changePassword", middleware.verifyAuth, AuthController.changePassword);
appRouter.put("/updateInformation", middleware.verifyAuth, AuthController.updateInformation);

// product

appRouter.post("/product", ProductController.getProduct);
appRouter.get("/hotProduct", ProductController.getHotProduct);

// room

appRouter.get("/rooms", RoomController.getRooms);
appRouter.get("/typeRooms", RoomController.getTypeRoom);

//booking

appRouter.post("/bookingRoom", middleware.verifyAuth, BookingController.BookingRoom);
appRouter.get("/myBooking", middleware.verifyAuth, BookingController.getMyBooking);

appRouter.get("/getBlankDate", BookingController.GetBlankDate);
// promotion

appRouter.post("/checkPromotion", PromotionController.CheckPromotion);

// extra service

appRouter.get("/extraService", ExtraServiceController.getExtraService);
export default appRouter;
