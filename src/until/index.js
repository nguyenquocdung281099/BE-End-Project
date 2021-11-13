import jwt from "jsonwebtoken"
import dotenv from "dotenv";

import Account from "../app/controller/model/Auth";
dotenv.config()

export const verifyAdmin = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ");
  console.log("authHeader", token[1]);
  jwt.verify(token[1]   , process.env.ACCESS_KEY, (err, data) => {
    console.log(err, data);
    if (err) {
      res.status(401).send({
        success: false,
        message: "bạn không có quyền truy cập",
      })
    }
    else {
      Account.findOne({ email: data.email }, (err, docs) => {
        console.log(err, docs);
        if (!err) {
          docs.idRole === 1 ? next() : res.status(404).send({
            success: false,
            message: "bạn không có quyền truy cập",
          })
        }
        else {
          res.status(404).send({
            success: false,
            message: "bạn không có quyền truy cập",
          })
        }
      })
    }
  })
}