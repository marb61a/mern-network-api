const express = require('express');
const { 
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

const { 
  userSignupValidator, passwordResetValidator 
} = require("../validator");
const { userById } = require("../controllers/user");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

// Password reset & forgotten routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// If any route contains :userId, the app will first execute userById
router.param("userId", userById);

module.exports = router;