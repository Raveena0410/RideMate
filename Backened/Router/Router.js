const express = require('express');
const router = express.Router();

const { register, login } = require('../Controller/Register');

router.post('/register', register);
router.post('/login', login);
const {
  publishRide,
  getRides,
} = require("../Controller/RideController");

// Existing authentication routes
router.post("/register", register);
router.post("/login", login);

// New ride routes
router.post("/rides", publishRide);
router.get("/rides", getRides);

module.exports = router;

module.exports = router;