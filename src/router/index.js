import express from "express";
import BookingManangerController from "../app/controller/adminController/BookingManagerController";
import DashboardController from "../app/controller/adminController/dashboardController";
import RoomManagerController from "../app/controller/adminController/RoomManagerController";
const appRouter = express.Router();

import AuthController from "../app/controller/AuthController";
import BookingController from "../app/controller/BookingController";
import CommentController from "../app/controller/CommentController";
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
appRouter.put(
  "/changePassword",
  middleware.verifyAuth,
  AuthController.changePassword
);
appRouter.put(
  "/updateInformation",
  middleware.verifyAuth,
  AuthController.updateInformation
);

// product

appRouter.post("/product", ProductController.getProduct);
appRouter.get("/hotProduct", ProductController.getHotProduct);

// room

appRouter.get("/rooms", RoomController.getRooms);
appRouter.get("/roomCurrent", RoomController.getRoomCurrent);
appRouter.get("/typeRooms", RoomController.getTypeRoom);

//booking

appRouter.post(
  "/bookingRoom",
  middleware.verifyAuth,
  BookingController.BookingRoom
);
appRouter.get(
  "/myBooking",
  middleware.verifyAuth,
  BookingController.getMyBooking
);

appRouter.get("/getBlankDate", BookingController.GetBlankDate);
// promotion

appRouter.post("/checkPromotion", PromotionController.CheckPromotion);

// extra service

appRouter.get("/extraService", ExtraServiceController.getExtraService);

// comment

appRouter.get("/comment", CommentController.getComment);
appRouter.post(
  "/setComment",
  middleware.verifyAuth,
  CommentController.createComment
);

//! admin router
// master
appRouter.get("/admin/masterData", DashboardController.getALlDataDashboard);
appRouter.get("/admin/user", DashboardController.getListUsers);
appRouter.get("/admin/comment", DashboardController.getListComment);
appRouter.get("/admin/booking", BookingManangerController.getListBooking);
appRouter.put("/admin/booking", BookingManangerController.changeStatusBooking);

appRouter.post("/AddRoom", RoomManagerController.addRoom);
appRouter.post("/updateRoom", RoomManagerController.updateRoom);
appRouter.post("/deleteRoom", RoomManagerController.deleteRoom);
appRouter.post("/deleteUser", DashboardController.deleteUser);
appRouter.post("/deleteService", DashboardController.deleteService);
appRouter.post("/deleteVoucher", DashboardController.deleteVoucher);
appRouter.get("/listVoucher", DashboardController.getListVoucher);
appRouter.get("/listService", DashboardController.getListService);

appRouter.post("/admin/addService", DashboardController.addService)
appRouter.post("/admin/addVoucher", DashboardController.addVoucher)


appRouter.post("/admin/updateService", DashboardController.updateService)
appRouter.post("/admin/updateVoucher", DashboardController.updateVoucher)
appRouter.get("/admin/getAllTypeRoom", RoomManagerController.getAllListTypeRoom)
appRouter.get("/admin/getTypeRoomMeta",RoomManagerController.getTypeRoomMeta)

appRouter.post("/admin/updateTypeRooms", RoomManagerController.updateTypeRooms)
appRouter.post("/admin/addTypeRooms", RoomManagerController.addTypeRooms)
export default appRouter;
