const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Yeh line bilkul perfect hai, process.env.MONGO_URI se code chalega
        await mongoose.connect("mongodb://fullstackDataBase:shraddha1234@ac-0gsyj5d-shard-00-00.sqs7mps.mongodb.net:27017,ac-0gsyj5d-shard-00-01.sqs7mps.mongodb.net:27017,ac-0gsyj5d-shard-00-02.sqs7mps.mongodb.net:27017/?ssl=true&replicaSet=atlas-cjurja-shard-0&authSource=admin&appName=Cluster0");
        console.log("MongoDB connected locally! Local DB green hai ✅");
    } catch (error) {
        console.log(error)
        console.error("Local DB connection failed ❌:", error.message);
        process.exit(1);
    }
};


module.exports = connectDB;