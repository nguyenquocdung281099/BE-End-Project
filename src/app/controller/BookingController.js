import Booking from "./model/Booking";

const BookingController = {
  getMyBooking: (req, res) => {
    const requestData = req.body;
    // email
  },

  BookingRoom: (req, res) => {
    const { requestData } = req.body;
    console.log(requestData);
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
};

export default BookingController;
