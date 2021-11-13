import mongoose from "mongoose"
async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/projectDb');
    console.log("success");
    return;
  } catch (error) {
    console.log(error);
    return;

  }
}

export default connect;