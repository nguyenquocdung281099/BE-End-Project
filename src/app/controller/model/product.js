import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: [],
    imageMain: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    priceOld: {
      type: String,
      required: true,
    },
    priceNew: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    tag: [],
    description: String,
    image2: String,
    image3: String,
  },
  {
    collection: "Product",
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
