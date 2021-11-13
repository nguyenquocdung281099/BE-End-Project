
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Account from "./model/Auth";
import dotenv from "dotenv"
dotenv.config()
const AuthController = {
  login: (req, res) => {
    const data = req.body.requestData;
    Account.findOne({ email: data.email }, async (err, docs) => {
      if (!docs) {
        res.send("mật khẩu or email bị sai, xin mời nhập lại")
      }
      else {
        const accessToken = jwt.sign(data, process.env.ACCESS_KEY, { expiresIn: "30000s" })
        const refreshToken = jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30h" })
        const checkPassword = await bcrypt.compare(data.password, docs.password);
        checkPassword ?
          res.json({
            accessToken,
            refreshToken,
            name: docs.userName,
            avatar: docs.avatar || null
          }) : res.status(401).json({
            success: false,
            message: "mật khẩu sai, xin mời nhập lại mật khẩu"
          })
      }
    })
  },

  register: (req, res) => {
    const requestData = req.body.requestData
    Account.find({ email: requestData.email }, async (err, docs) => {
      if (err) {
        res.sendStatus(404).message("err")
      }
      else if (docs.length !== 0) {

        res.json({
          success: false,
          message: "email này đã tồn tại , xin mời bạn đăng kí email khác"
        })
      }
      else {
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
              message: "đăng kí tài khoản thành công"
            })
          } catch (error) {
            res.sendStatus(404)
          }
        });
      }
    })
  },

  getUser: (req, res) => {
    Account.find({}, (err, account) => {
      if (err) {
        res.status(404)
      } else {
        res.send({
          success: true,
          data: account
        })
      }
    })
  }
}

export default AuthController;