import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Acount",
    },
    idRoom: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    avatar:{
      type: String,
    },
    userName:{
      type: String,
    },
    createAt:{
      type: String,
    }
  },
  {
    collection: "Comment",
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
