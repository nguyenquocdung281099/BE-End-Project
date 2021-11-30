import mongoose from "mongoose";

const { Schema } = mongoose;

const ExtraServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  {
    collection: "ExtraService",
  }
);

const ExtraService = mongoose.model("ExtraService", ExtraServiceSchema);
export default ExtraService;
