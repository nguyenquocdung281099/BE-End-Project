import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    idUser: {
      required: true,
      type: String,
    },
    dateStart: {
      required: true,
      type: String,
    },
    dateEnd: {
      required: true,
      type: String,
    },
    totalCost: {
      required: true,
      type: String,
    },
    status: {
      required: true,
      type: String,
    },
    idroom: {
      required: true,
      type: String,
      ref:"Room2"
    },
    userName: {
      required: true,
      type: String,
    },
    number: {
      required: true,
      type: Number,
    },
    service: [],
    paymethod: {
      required: true,
      type: String,
    },
    codeDiscount: String,
  },
  {
    collection: "Booking",
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
