const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB Connection successful");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
  }
};

module.exports = connectDB;