const express = require('express');
const {
  userById,
  allUsers,
  getUser
} = require('../controllers/user');
const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);

// If any route contains :userId, the app will first execute userById
router.param("userId", userById);

module.exports = router;