const express = require('express');
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  hasAuthorization
} = require('../controllers/user');

const { requireSignin } = require("../controllers/auth");
const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);

// Photo
router.get("/user/photo/:userId", userPhoto);

// If any route contains :userId, the app will first execute userById
router.param("userId", userById);

module.exports = router;