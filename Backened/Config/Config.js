const mongoose = require('mongoose');

async function connect() {
  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is missing.');
  }

  await mongoose.connect(process.env.MONGODB_URL);

  console.log('MongoDB connected successfully');
}

module.exports = connect;