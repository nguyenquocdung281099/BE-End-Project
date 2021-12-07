import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Account from "./model/Auth";
import dotenv from "dotenv";
dotenv.config();
const AuthController = {
  login: (req, res) => {
    const data = req.body.requestData;
    Account.findOne({ email: data.email }, async (err, docs) => {
      if (!docs) {
        return res.status(400).send({
          success: false,
          message: "mật khẩu sai, xin mời nhập lại mật khẩu",
        });
      } else {
        const accessToken = jwt.sign({ email: docs.email }, process.env.ACCESS_KEY, {
          expiresIn: "3000s",
        });
        const refreshToken = jwt.sign(data, process.env.JWT_KEY, {
          expiresIn: "30h",
        });
        let doc = await Account.findOneAndUpdate(
          { email: data.email },
          { refreshToken: refreshToken },
          {
            new: true,
          }
        );
        const checkPassword = await bcrypt.compare(data.password, docs.password);
        checkPassword
          ? res.send({
              accessToken,
              refreshToken,
              email: docs.email,
              userName: docs.userName,
              avatar: docs.avatar || null,
              address: docs.address,
              fullName: docs.fullName,
              phone: docs.phone,
              id: docs._id,
              idRole: docs.idRole,
            })
          : res.status(400).send({
              success: false,
              message: "mật khẩu sai, xin mời nhập lại mật khẩu",
            });
      }
    });
  },

  register: (req, res) => {
    const requestData = req.body.requestData;
    Account.find({ email: requestData.email }, async (err, docs) => {
      if (err) {
        res.status(400).json("err");
      } else if (docs.length !== 0) {
        res.status(400).json({
          success: false,
          message: "email này đã tồn tại , xin mời bạn đăng kí email khác",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        await bcrypt.hash(requestData.password, salt, (err, hashPassword) => {
          try {
            const newAccount = new Account({
              ...requestData,
              password: hashPassword,
            });
            newAccount.save();
            res.json({
              success: true,
              message: "đăng kí tài khoản thành công",
            });
          } catch (error) {
            res.sendStatus(404);
          }
        });
      }
    });
  },

  getUser: (req, res) => {
    Account.find({}, (err, account) => {
      if (err) {
        res.status(404);
      } else {
        res.send({
          success: true,
          data: account,
        });
      }
    });
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.requestData.refreshToken;
    Account.find({ refreshToken }, (err, data) => {
      if (!err && data) {
        const accessToken = jwt.sign(
          { email: data.email, password: data.password },
          process.env.ACCESS_KEY,
          { expiresIn: "3000s" }
        );
        res.json({ accessToken });
      } else {
        res.status(404).json({
          message: "refresh token expired",
        });
      }
    });
  },

  getCurrentUser: (req, res) => {
    const { email } = req.body.requestData;
    Account.findOne({ email: email }, (err, docs) => {
      if (docs) {
        res.json({
          email: docs.email,
          userName: docs.userName,
          avatar: docs.avatar || null,
          address: docs.address,
          fullName: docs.fullName,
          phone: docs.phone,
          id: docs._id,
        });
      }
    });
  },

  changePassword: (req, res) => {
    const { newPassword, email } = req.body.requestData;
    Account.findOne({ email }, async (err, user) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "user incorrect",
        });
      } else if (user) {
        const salt = await bcrypt.genSalt(10);
        await bcrypt.hash(newPassword, salt, (err, hashPassword) => {
          try {
            Account.findOneAndUpdate({ email }, { password: hashPassword });
            res.send({
              success: true,
              message: "change password success",
            });
          } catch (error) {
            res.status(403).json({
              success: false,
              message: "change password not success",
            });
          }
        });
      }
    });
  },

  updateInformation: (req, res) => {
    const { requestData, email } = req.body;
    Account.findOneAndUpdate({ email }, { ...requestData }, (err, docs) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "user incorrect",
        });
      } else if (docs) {
        res.json({
          success: true,
          message: "change information success  ",
        });
      }
    });
  },
};

export default AuthController;
