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
      ref: "Account",
    },
    idRoom: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    collection: "Comment",
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
