const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    genre: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    audio: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);