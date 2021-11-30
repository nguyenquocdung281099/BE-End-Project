import mongoose from "mongoose";

const { Schema } = mongoose;

const PromotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Promotion",
  }
);

const Promotion = mongoose.model("Promotion", PromotionSchema);
export default Promotion;
