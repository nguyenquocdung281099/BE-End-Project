import mongoose from "mongoose";
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://dungnq:184321449a@cluster0.r3nbu.mongodb.net/Booking_hotel?retryWrites=true&w=majority" ||
        "mongodb://127.0.0.1:27017/projectDb"
    );
    console.log("success");
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export default connect;
