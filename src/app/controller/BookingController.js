import { isEmpty } from "lodash";
import moment from "moment";
import Booking from "./model/Booking";

const BookingController = {
  getMyBooking: (req, res) => {
    const id = req.query.id;
    Booking.find({ idUser: id }, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
          data: docs,
        });
      }
    });
  },

  BookingRoom: (req, res) => {
    const { requestData } = req.body;
    try {
      const newBooking = new Booking({
        ...requestData,
      });
      newBooking.save();
      res.json({
        success: true,
        message: "booking room success",
      });
    } catch (error) {
      res.status(403).json({
        success: true,
        message: "booking room success",
      });
    }
  },

  GetBlankDate: (req, res) => {
    const id = req.query.id;
    Booking.find({ idroom: id }, (err, bookings) => {
      if (err) {
        res.status(404);
      } else {
        if (!isEmpty(bookings)) {
          let blankPage = [];
          bookings.map((item) => {
            const { dateStart, dateEnd } = item;
            const totalDate =
              moment(new Date(dateEnd)).diff(moment(new Date(dateStart)), "days") + 1;
            for (let i = 0; i < totalDate; i++) {
              blankPage.push(moment(new Date(dateStart)).add(i, "day"));
            }
          });
          res.json({
            success: true,
            data: blankPage,
          });
        } else {
          res.json({
            success: true,
            data: [],
          });
        }
      }
    });
  },
};

export default BookingController;
