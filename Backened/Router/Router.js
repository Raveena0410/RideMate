
const express = require("express");
const router = express.Router();

const { register, login } = require("../Controller/Register");

const {
  publishRide,
  getRides,
} = require("../Controller/RideController");

const {
  createBooking,
  getBookings,
} = require("../Controller/Booking");

// Authentication routes
router.post("/register", register);
router.post("/login", login);

// Ride routes
router.post("/rides", publishRide);
router.get("/rides", getRides);

// Booking routes
router.post("/bookings", createBooking);
router.get("/bookings", getBookings);

module.exports = router;
