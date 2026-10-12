
const Ride = require("../Model/Ride");

const publishRide = async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      time,
      availableSeats,
      pricePerSeat,
    } = req.body || {};

    if (
      !from?.trim() ||
      !to?.trim() ||
      !date?.trim() ||
      !time?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill in all ride details.",
      });
    }

    if (
      !Number.isInteger(availableSeats) ||
      availableSeats < 1 ||
      availableSeats > 6
    ) {
      return res.status(400).json({
        message: "Seats must be between 1 and 6.",
      });
    }

    const price = Number(pricePerSeat);

    if (
      pricePerSeat === undefined ||
      pricePerSeat === null ||
      String(pricePerSeat).trim() === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        message: "Enter a valid price.",
      });
    }

    const ride = await Ride.create({
      from: from.trim(),
      to: to.trim(),
      date: date.trim(),
      time: time.trim(),
      availableSeats,
      pricePerSeat: price,
    });

    return res.status(201).json({
      message: "Ride published successfully!",
      ride,
    });
  } catch (error) {
    console.error("Publish ride error:", error.message);

    return res.status(500).json({
      message: "Unable to publish ride.",
    });
  }
};

const getRides = async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    return res.status(200).json({ rides });
  } catch (error) {
    console.error("Get rides error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch rides.",
    });
  }
};

module.exports = { publishRide, getRides };
