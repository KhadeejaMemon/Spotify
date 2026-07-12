const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connection successful`);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    // process.exit(1) hata diya — Vercel serverless me function ko kill nahi karna chahiye
  }
};

module.exports = connectDB;