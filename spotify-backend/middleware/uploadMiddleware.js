const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =======================
// Create Upload Folders
// =======================
const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

createFolder("uploads/avatars");
createFolder("uploads/artists");
createFolder("uploads/albums");
createFolder("uploads/songs");
createFolder("uploads/thumbnails");

// =======================
// Common Image Filter
// =======================
const imageFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/jfif",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) ||
    [".jpg", ".jpeg", ".png", ".jfif"].includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// =======================
// File Name Generator
// =======================
const fileName = (file) => {
  return (
    Date.now() +
    "-" +
    Math.round(Math.random() * 1000000) +
    path.extname(file.originalname)
  );
};

// =======================
// Avatar Storage
// =======================
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, fileName(file));
  },
});

// =======================
// Artist Storage
// =======================
const artistStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/artists");
  },
  filename: (req, file, cb) => {
    cb(null, fileName(file));
  },
});

// =======================
// Album Storage
// =======================
const albumStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/albums");
  },
  filename: (req, file, cb) => {
    cb(null, fileName(file));
  },
});

// =======================
// Song Storage
// =======================
const songStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, "uploads/thumbnails");
    } else if (file.fieldname === "audio") {
      cb(null, "uploads/songs");
    }
  },

  filename: (req, file, cb) => {
    cb(null, fileName(file));
  },
});

// =======================
// Song Filter
// =======================
const songFilter = (req, file, cb) => {
  if (file.fieldname === "thumbnail") {
    return imageFilter(req, file, cb);
  }

  if (file.fieldname === "audio") {
    if (file.mimetype.startsWith("audio/")) {
      return cb(null, true);
    }

    return cb(new Error("Only audio files allowed"), false);
  }

  cb(new Error("Invalid file"), false);
};

// =======================
// Upload Middlewares
// =======================
const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: imageFilter,
});

const uploadArtist = multer({
  storage: artistStorage,
  fileFilter: imageFilter,
});

const uploadAlbum = multer({
  storage: albumStorage,
  fileFilter: imageFilter,
});

const uploadSong = multer({
  storage: songStorage,
  fileFilter: songFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = {
  uploadAvatar,
  uploadArtist,
  uploadAlbum,
  uploadSong,
};