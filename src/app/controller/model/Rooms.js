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
    status: {
      required: true,
      type: Boolean,
    },
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
    collection: "Room",
  }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;
