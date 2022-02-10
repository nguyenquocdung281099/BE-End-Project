import { json } from "body-parser";
import Room from "./model/Room2";
import TypeRoom from "./model/TypeRoom";
import Booking from "./model/Booking";
import moment from "moment";

const RoomController = {
  // get Room

  getRooms: (req, res) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 5;
    const page = parseInt(query.page) || 1;
    const rating = parseInt(query.rating) || null;
    const search = query?.search || "";
    const idtyperoom = query.type || null;
    const checkin = moment(query.checkin);
    const checkout = moment(query.checkout);
    console.log({ checkin, checkout });
    const guest = query.guest;
    const filter = {
      ...(idtyperoom && { idtyperoom: idtyperoom }),
      ...(rating && { rating: rating }),
      ...(search && { name: new RegExp(search) }),
    };

    if (query.checkin) {
      Booking.find({}, (err, booking) => {
        let idRoomNotEmpty = [];
        booking.forEach((item) => {
          // TH1: CK <= T1 <= CO
          // TH2, T1 <= CK <= T2
          if (
            (checkin <= moment(new Date(item.dateStart)) &&
              checkout >= moment(new Date(item.dateStart))) ||
            (checkin >= moment(new Date(item.dateStart)) &&
              checkin <= moment(new Date(item.dateEnd)))
          ) {
            idRoomNotEmpty.push(item.idroom);
          }
        });
        console.log(idRoomNotEmpty);
        Room.find({
          _id: {
            $nin: [...idRoomNotEmpty],
          },
        })
          .limit(limit)
          .skip(limit * (page - 1))
          .populate("idtyperoom")
          .exec((err, Rooms) => {
            Room.count({
              _id: {
                $nin: [...idRoomNotEmpty],
              },
            }).exec((err, count) => {
              // đếm để tính có bao nhiêu trang
              if (err) {
                return res.status(404).json({
                  success: false,
                  message: "không tồn tại dữ liệu",
                });
              }
              res.json({
                data: Rooms,
                success: true,
                meta: {
                  page: page,
                  limit: limit,
                  total: count,
                },
              });
            });
          });
      });
    } else {
      const sort = { ...(query._sort && { pricePerday: "desc" }) };
      Room.find({ ...filter })
        .limit(limit)
        .skip(limit * (page - 1))
        .populate("idtyperoom")
        .exec((err, Rooms) => {
          Room.count({ ...filter }).exec((err, count) => {
            // đếm để tính có bao nhiêu trang
            if (err) {
              return res.status(404).json({
                success: false,
                message: "không tồn tại dữ liệu",
              });
            }
            res.json({
              data: Rooms,
              success: true,
              meta: {
                page: page,
                limit: limit,
                total: count,
              },
            });
          });
        });
    }
  },

  getTypeRoom: (req, res) => {
    TypeRoom.find({}, (err, type) => {
      if (err) {
        res.status(404).send({
          message: "not have data",
          success: false,
        });
      }
      if (type && !err) {
        res.send({ data: type, success: true });
      }
    });
  },

  getRoomCurrent: (req, res) => {
    const { id } = req.query;
    Room.findOne({ _id: id })
      .populate("idtyperoom")
      .then((docs) =>
        res.json({
          data: docs,
          success: true,
        })
      )
      .catch((err) =>
        res.status(404).json({
          data: {},
          success: false,
        })
      );
  },
};

export default RoomController;
