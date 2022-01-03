import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    idtyperoom: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "TypeRoom",
    },
    booking: [],
    number: {
      required: true,
      type: Number,
    },
    rating: {
      required: true,
      type: Number,
    },
    pricePerday: {
      required: true,
      type: Number,
    },
    description: {
      required: true,
      type: String,
    },
    image: [],
  },
  {
    collection: "Room2",
  }
);

const Room2= mongoose.model("Room2", RoomSchema);
export default Room2;
