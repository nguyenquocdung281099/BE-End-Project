import Booking from "../model/Booking";

const BookingManangerController = {
  getListBooking: (req, res) => {
    const query = req.query;
    const limit = parseInt(query?.limit) || 10;
    const page = parseInt(query?.page) || 1;
    const search = query?.search || "";
    const filter =
      search !== "undefined" ? { userName: new RegExp(search) } : {};
    Booking.find(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate("idroom")
      .exec((err, booking) => {
        Booking.count(filter).exec((err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) {
            return res.status(404).json({
              success: false,
              message: "không tồn tại dữ liệu",
            });
          }
          res.json({
            data: booking,
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
  changeStatusBooking: (req, res) => {
    const { id, status } = req.body.requestData;
    Booking.findByIdAndUpdate({_id: id}, { status }, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          message: "update status booking success",
          success: true,
        });
      }
    });
  },
};

export default BookingManangerController;
