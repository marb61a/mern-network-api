const express = require("express");
const { 
  getPosts, 
  createPost,
  postsByUser,
  postById,
  updatePost,
  deletePost,
  photo,
} = require("../controllers/post");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);

// Post routes
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.param("postId", postById);

module.exports = router;