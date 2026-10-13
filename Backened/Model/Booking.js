
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    passengerName: {
      type: String,
      required: true,
      trim: true,
    },

    passengerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    seatsBooked: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
