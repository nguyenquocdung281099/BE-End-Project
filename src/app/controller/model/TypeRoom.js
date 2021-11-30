import mongoose from "mongoose";

const { Schema } = mongoose;

const TypeRoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: Number,
  },
  {
    collection: "TypeRoom",
  }
);

const TypeRoom = mongoose.model("TypeRoom", TypeRoomSchema);
export default TypeRoom;
