const multer = require("multer");
const path = require("path");

// =======================
// Common Image Filter
// =======================
const imageFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/jfif"
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) ||
    ext === ".jfif" ||
    ext === ".jpg" ||
    ext === ".jpeg" ||
    ext === ".png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// =======================
// Audio Filter
// =======================

const audioFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed!"), false);
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
// Avatar Upload
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
// Artist Upload
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
// Album Upload
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
// Song Thumbnail Upload
// =======================
// =======================
// Song Upload (Thumbnail + Audio)
// =======================

const songStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, "uploads/songs");
    } else if (file.fieldname === "audio") {
      cb(null, "uploads/audio");
    }
  },

  filename: (req, file, cb) => {
    cb(null, fileName(file));
  },
});


// const songFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (file.fieldname === "thumbnail") {
//     if (
//       file.mimetype.startsWith("image/") ||
//       (file.mimetype === "application/octet-stream" &&
//         [".jpg", ".jpeg", ".png", ".jfif"].includes(ext))
//     ) {
//       return cb(null, true);
//     }
//   }

//   if (file.fieldname === "audio") {
//     if (
//       file.mimetype.startsWith("audio/") ||
//       (file.mimetype === "application/octet-stream" &&
//         ext === ".mp3")
//     ) {
//       return cb(null, true);
//     }
//   }

//   return cb(new Error("Invalid file type"), false);
// };




const songFilter = (req, file, cb) => {
  console.log("------------ FILE ------------");
  console.log("Field:", file.fieldname);
  console.log("Original:", file.originalname);
  console.log("Mime:", file.mimetype);
  console.log("Extension:", path.extname(file.originalname));
  console.log("------------------------------");

  cb(null, true);
};
// =======================
// Audio Upload
// =======================

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audio");
  },
  filename: (req, file, cb) => {
    cb(null, fileName(file));
  },
});

// =======================
// Export Uploads
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
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});
module.exports = {
  uploadAvatar,
  uploadArtist,
  uploadAlbum,
  uploadSong,
};