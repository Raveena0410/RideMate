const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully");
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = connect;;