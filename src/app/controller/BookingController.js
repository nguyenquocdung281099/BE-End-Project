import { isEmpty } from "lodash";
import moment from "moment";
import Booking from "./model/Booking";
import nodemailer from "nodemailer";

const BookingController = {
  getMyBooking: (req, res) => {
    const id = req.query.id;
    Booking.find({ idUser: id })
      .populate("idroom")
      .exec((err, docs) => {

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
      var transporter = nodemailer.createTransport({
        // config mail server
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "hotel.dungnq.project@gmail.com", //Tài khoản gmail vừa tạo
          pass: "184321449", //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
      var content = "";
      content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Chúc mừng bạn đặt phòng thành công</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>
    `;
      var mainOptions = {
        // thiết lập đối tượng, nội dung gửi mail
        from: "NQH-Test nodemailer",
        to: "nguyenquocdung281099@gmail.com",
        subject: "Test Nodemailer",
        text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content, //Nội dung html mình đã tạo trên kia :))
      };
      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
        }
      });
      res.json({
        success: true,
        message: "booking room success",
      });
    } catch (error) {
    
      res.status(403).json({
        success: true,
        message: "booking room fail",
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
            const { dateStart, dateEnd, status } = item;

            if (!(status === "FINISH" || status === "CANCEL")) {
              
              const totalDate =
                moment(new Date(dateEnd)).diff(
                  moment(new Date(dateStart)),
                  "days"
                ) + 1;
              for (let i = 0; i < totalDate; i++) {
                blankPage.push(moment(new Date(dateStart)).add(i, "day"));
              }
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
