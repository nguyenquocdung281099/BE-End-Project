import mongoose from "mongoose";
async function connect() {
  try {
    await mongoose.connect(
      "mongodb://dungnq:184321449a@cluster0-shard-00-00.r3nbu.mongodb.net:27017,cluster0-shard-00-01.r3nbu.mongodb.net:27017,cluster0-shard-00-02.r3nbu.mongodb.net:27017/Booking_hotel?ssl=true&replicaSet=atlas-d8wzxh-shard-0&authSource=admin&retryWrites=true&w=majority" ||
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
