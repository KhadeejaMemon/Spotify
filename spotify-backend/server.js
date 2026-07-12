const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const userRoutes = require("./routes/userRoutes");
const searchRoutes = require("./routes/searchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const historyRoutes = require("./routes/historyRoutes");

const errorHandler = require("./middleware/errorMiddleware");


dotenv.config();


const app = express();


// Database
connectDB();


// Middleware

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));

app.use(cookieParser());


app.use(
 cors({
   origin: process.env.CLIENT_URL,
   credentials:true
 })
);



// Routes

app.use("/api/auth", authRoutes);

app.use("/api/artists", artistRoutes);

app.use("/api/albums", albumRoutes);

app.use("/api/songs", songRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/playlists", playlistRoutes);

app.use("/api/users", userRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/history", historyRoutes);



// Test

app.get("/",(req,res)=>{
 res.send("Spotify Backend API Running...");
});


app.get("/api/test",(req,res)=>{

 res.json({
  success:true,
  message:"Backend Working Successfully"
 });

});



// Error Handler

app.use(errorHandler);


// IMPORTANT FOR VERCEL

module.exports = app;