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
  },
  {
    collection: "Booking",
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
