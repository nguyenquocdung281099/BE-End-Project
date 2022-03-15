import Room from "../model/Room2";
import TypeRoom from "../model/TypeRoom";

const RoomManagerController = {
  addRoom: (req, res) => {
    const requestData = req.body.requestData;
    try {
      const NewRoom = new Room({
        ...requestData,
      });
      NewRoom.save();
      res.json({ success: true });
    } catch (error) {
      res.status(404);
    }
  },

  updateRoom: (req, res) => {
    const { requestData, id } = req.body;
    Room.findByIdAndUpdate(id, { ...requestData }, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
          message: "update room success",
        });
      }
    });
  },

  deleteRoom: (req, res) => {
    const { id } = req.body;
    Room.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
          message: "delete room success",
        });
      }
    });
  },

  getAllListTypeRoom: (req, res) => {
    TypeRoom.find({}, (err, docs) => {
      if (err) {
        res.status(400);
      } else {
        res.json({
          success: true,
          data: docs,
        });
      }
    });
  },

  getTypeRoomMeta: (req, res) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 5;
    const page = parseInt(query.page) || 1;
    const rating = parseInt(query.rating) || null;
    const search = query?.search || "";
    const idtyperoom = query.type || null;
    const filter = {
      ...(idtyperoom && { idtyperoom: idtyperoom }),
      ...(rating && { rating: rating }),
      ...(search !== "undefined" && { name: new RegExp(search) }),
    };
    TypeRoom.find({ ...filter })
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, Rooms) => {
        TypeRoom.count({ ...filter }).exec((err, count) => {
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
  },

  addTypeRooms: (req, res) => {
    const requestData = req.body.requestData;
    try {
      const NewRoom = new TypeRoom({
        ...requestData,
      });
      NewRoom.save();
      res.json({ success: true });
    } catch (error) {
      res.status(404);
    }
  },

  updateTypeRooms: (req, res) => {
    const { requestData, id } = req.body;
   
    TypeRoom.findByIdAndUpdate(id, { ...requestData }, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
          message: "update room success",
        });
      }
    });
  },
};

export default RoomManagerController;
