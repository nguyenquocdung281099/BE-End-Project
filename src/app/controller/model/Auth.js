import mongoose from 'mongoose';

const { Schema } = mongoose;

const AccountSchema = new Schema({
  email: String,
  password: String,
  userName: String,
  fullName: String,
  prefix: String,
  phone: Number,
  address: String,
  avatar: String,
  idRole: Number,
}, {
  collection: "Account"
});

const Account = mongoose.model("Account", AccountSchema);
export default Account;