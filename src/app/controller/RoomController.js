import Room from "./model/Rooms";
import TypeRoom from "./model/TypeRoom";
const RoomController = {
  // get Room

  getRooms: (req, res) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 5;
    const page = parseInt(query.page) || 1;
    const rating = parseInt(query.rating) || null;
    const idtyperoom = query.type || null;
    const filter = {
      ...(idtyperoom && { idtyperoom: idtyperoom }),
      ...(rating && { rating: rating }),
    };
    const sort = { ...(query._sort && { pricePerday: "desc" }) };
    Room.find(filter)
      // .sort({ pricePerday: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate("idtyperoom")
      .exec((err, Rooms) => {
        console.log(Rooms);
        Room.count(filter).exec((err, count) => {
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
};

export default RoomController;
