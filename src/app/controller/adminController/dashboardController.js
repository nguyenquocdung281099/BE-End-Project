import Booking from "../model/Booking";
import moment from "moment";
import Account from "../model/Auth";
import Room from "../model/Room2";
import ExtraService from "../model/ExtraService";
import Comment from "../model/Comment";
import Promotion from "../model/Promotion";
import { dataTrain } from "../../../constant/index";

const { BayesClassifier } = require("natural");
const DashboardController = {
  getALlDataDashboard: (req, res) => {
    let data = {};

    /// data chart
    Booking.find({}, (err, docs) => {
      if (Array.isArray(docs)) {
        data = {
          ...data,
          dataStatic: {
            ...data.dataStatic,
            totalBookings: docs.length,
          },
        };
        let totalMoney = [];
        for (let index = 1; index < 13; index++) {
          const totalMoneyMonth = docs.reduce((total, item) => {
            if (
              moment(item.createdAt).month() === index &&
              moment(item.createdAt).year() === 2021
            ) {
              return total + parseFloat(item.totalCost);
            }
            return total;
          }, 0);
          totalMoney.push(totalMoneyMonth);
        }
        let totalMoneyForpaymentOnline = [];
        for (let index = 1; index < 13; index++) {
          const totalMoneyMonth = docs.reduce((total, item) => {
            if (
              moment(item.createdAt).month() === index &&
              moment(item.createdAt).year() === 2021 &&
              item.paymethod !== "direct-payment"
            ) {
              return total + parseFloat(item.totalCost);
            }
            return total;
          }, 0);
          totalMoneyForpaymentOnline.push(totalMoneyMonth);
        }
        let totalMoneyForpaymentdirect = [];
        for (let index = 1; index < 13; index++) {
          const totalMoneyMonth = docs.reduce((total, item) => {
            if (
              moment(item.createdAt).month() === index &&
              moment(item.createdAt).year() === 2021 &&
              item.paymethod === "direct-payment"
            ) {
              return total + parseFloat(item.totalCost);
            }
            return total;
          }, 0);
          totalMoneyForpaymentdirect.push(totalMoneyMonth);
        }

        Account.find({}, (err, users) => {
          if (users) {
            Room.find({}, (err, rooms) => {
              if (rooms) {
                ExtraService.find({}, (err, service) => {
                  if (service) {
                    res.json({
                      dataChart: [
                        {
                          name: "Online",
                          type: "area",
                          data: totalMoneyForpaymentOnline,
                        },
                        {
                          name: "Direct",
                          type: "line",
                          data: [
                            0, 10, 20, 300, 400, 500, 600, 700, 800, 900, 1000,
                          ],
                        },
                        { name: "Total", type: "column", data: totalMoney },
                      ],
                      dataStatic: {
                        ...data.dataStatic,
                        totalService: docs.length,
                        totalRooms: rooms.length,
                        totalUsers: users.length,
                      },
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  getListUsers: (req, res) => {
    const query = req.query;
    const limit = parseInt(query?.limit) || 5;
    const page = parseInt(query?.page) || 1;
    const search = query?.search || "";
    const filter =
      search !== "undefined" ? { userName: new RegExp(search) } : {};
    Account.find(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, users) => {
        Account.count(filter).exec((err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) {
            return res.status(404).json({
              success: false,
              message: "không tồn tại dữ liệu",
            });
          }
          res.json({
            data: users,
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
  getListComment: async (req, res) => {
    const query = req.query;
    const limit = parseInt(query?.limit) || 4;
    const page = parseInt(query?.page) || 1;
    const search = query?.search || "";
    const filter = search !== "undefined" ? { name: search } : {};
    const classifier = new BayesClassifier();
    const trainData = async () => {
      dataTrain.map((item) => classifier.addDocument(item.input, item.output));
      await classifier.train();
    };

    await trainData();

    classifier.save("classifier.json", function (err, classifier) {
      if (err) {
        console.log(err);
      }
      // the classifier is saved to the classifier.json file!
    });
    Comment.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createAt: -1 })
      .exec((err, comment) => {
        Comment.count(filter).exec((err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) {
            return res.status(404).json({
              success: false,
              message: "không tồn tại dữ liệu",
            });
          }
          const newComent = comment.map((item) => {
            return {
              ...item._doc,
              createAt: item.createAt,
              evaluate: classifier.classify(item.content),
            };
          });
          res.json({
            data: newComent,
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

  deleteUser: (req, res) => {
    const { id } = req.body;
    Account.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },
  statisticalComent: async (req, res) => {
    const classifier = new BayesClassifier();
    const trainData = async () => {
      dataTrain.map((item) => classifier.addDocument(item.input, item.output));
      await classifier.train();
    };

    await trainData();
    Comment.find({}, (err, docs) => {
      if(!err){
        const dataTrain = docs.map((item) => {
          return classifier.classify(item.content);
        });
        let good = 0;
        dataTrain.forEach((item) => {
          if (item === "good") {
            good++;
          }
        });
        res.json({
          data: good / docs.length
        })
      }
    });
  },
  deleteService: (req, res) => {
    const { id } = req.body;
    ExtraService.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },

  deleteVoucher: (req, res) => {
    const { id } = req.body;
    console.log(id);
    Promotion.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },
  getListVoucher: (req, res) => {
    const query = req.query;
    const limit = parseInt(query?.limit) || 10;
    const page = parseInt(query?.page) || 1;
    const search = query?.search || "";
    const filter =
      search !== "undefined" ? { userName: new RegExp(search) } : {};
    Promotion.find(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, booking) => {
        Promotion.count(filter).exec((err, count) => {
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
  getListService: (req, res) => {
    const query = req.query;
    const limit = parseInt(query?.limit) || 10;
    const page = parseInt(query?.page) || 1;
    const search = query?.search || "";
    const filter =
      search !== "undefined" ? { userName: new RegExp(search) } : {};
    ExtraService.find(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, booking) => {
        ExtraService.count(filter).exec((err, count) => {
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
  addService: (req, res) => {
    const { requestData } = req.body;
    const newService = new ExtraService({
      ...requestData,
    });
    newService.save((err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },
  addVoucher: (req, res) => {
    const { requestData } = req.body;
    const newService = new Promotion({
      ...requestData,
    });
    newService.save((err, docs) => {
      console.log({ docs, err });
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },

  updateService: (req, res) => {
    const { id, requestData } = req.body;
    ExtraService.findByIdAndUpdate(id, { ...requestData }, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },

  updateVoucher: (req, res) => {
    const { id, requestData } = req.body;
    Promotion.findByIdAndUpdate(id, { ...requestData }, (err, docs) => {
      if (err) {
        res.status(404);
      } else {
        res.json({
          success: true,
        });
      }
    });
  },
};

export default DashboardController;
