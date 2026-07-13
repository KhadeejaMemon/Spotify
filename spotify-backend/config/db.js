const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connection.readyState === 1;

    console.log("MongoDB Connection successful");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    throw error; // error ko suppress mat karein
  }
};

module.exports = connectDB;