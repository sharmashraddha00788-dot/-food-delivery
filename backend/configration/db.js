const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Yeh line bilkul perfect hai, process.env.MONGO_URI se code chalega
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected locally! Local DB green hai ✅");
    } catch (error) {
        console.error("Local DB connection failed ❌:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;