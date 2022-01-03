import mongoose from "mongoose";

const { Schema } = mongoose;

const AccountSchema = new Schema(
  {
    email: String,
    password: String,
    userName: String,
    fullName: String,
    prefix: String,
    phone: Number,
    address: String,
    avatar: String,
    idRole: String,
  },
  {
    collection: "Acount",
  }
);

const Account = mongoose.model("Acount", AccountSchema);
export default Account;
