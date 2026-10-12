
const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    pricePerSeat: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Ride || mongoose.model("Ride", rideSchema);
