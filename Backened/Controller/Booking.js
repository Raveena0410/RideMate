
const mongoose = require("mongoose");
const Booking = require("../Model/Booking");
const Ride = require("../Model/Ride");

// Create a booking
const createBooking = async (req, res) => {
  let updatedRide = null;
  let seatsBooked = 0;

  try {
    const {
      rideId,
      passengerName,
      passengerPhone,
      seatsBooked: requestedSeats,
    } = req.body || {};

    // Validate passenger details
    if (!passengerName?.trim() || !passengerPhone?.trim()) {
      return res.status(400).json({
        message: "Please enter your name and phone number.",
      });
    }

    // Validate ride ID
    if (!mongoose.isValidObjectId(rideId)) {
      return res.status(400).json({
        message: "Invalid ride ID.",
      });
    }

    // Validate seats
    seatsBooked = Number(requestedSeats);

    if (
      !Number.isInteger(seatsBooked) ||
      seatsBooked < 1 ||
      seatsBooked > 6
    ) {
      return res.status(400).json({
        message: "Seats must be between 1 and 6.",
      });
    }

    // Atomically reserve seats so two passengers
    // cannot book the same remaining seats.
    updatedRide = await Ride.findOneAndUpdate(
      {
        _id: rideId,
        availableSeats: { $gte: seatsBooked },
      },
      {
        $inc: { availableSeats: -seatsBooked },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRide) {
      const rideExists = await Ride.exists({ _id: rideId });

      if (!rideExists) {
        return res.status(404).json({
          message: "This ride was not found.",
        });
      }

      return res.status(409).json({
        message: "Not enough seats available for this ride.",
      });
    }

    // Calculate price on the backend
    const totalPrice = Number(updatedRide.pricePerSeat) * seatsBooked;

    // Save booking in MongoDB
    const booking = await Booking.create({
      ride: updatedRide._id,
      passengerName: passengerName.trim(),
      passengerPhone: passengerPhone.trim(),
      seatsBooked,
      totalPrice,
      status: "confirmed",
    });

    return res.status(201).json({
      message: "Ride booked successfully!",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    // Restore seats if they were reserved but saving
    // the booking failed.
    if (updatedRide) {
      try {
        await Ride.updateOne(
          { _id: updatedRide._id },
          { $inc: { availableSeats: seatsBooked } }
        );
      } catch (rollbackError) {
        console.error("Seat restoration error:", rollbackError);
      }
    }

    return res.status(500).json({
      message: "Unable to complete booking. Please try again.",
    });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("ride")
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Get bookings error:", error);

    return res.status(500).json({
      message: "Unable to fetch bookings.",
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
};
