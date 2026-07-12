// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");
// const { validateRegister, validateLogin } = require("../utils/authValidator");
// const {
//   registerUser,
//   loginUser,
//   getMe,
// } = require("../controllers/authController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/me", protect, getMe);
// router.post("/register", validateRegister, register);
// router.post("/login", validateLogin, login);

// module.exports = router;



const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../validators/authValidator");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

// Register
router.post("/register", validateRegister, registerUser);

// Login
router.post("/login", validateLogin, loginUser);

// Profile
router.get("/me", protect, getMe);

module.exports = router;