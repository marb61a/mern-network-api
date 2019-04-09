const express = require("express");
const { 
  getPosts, 
  createPost,
  postsByUser,
  postById,
  updatePost,
  deletePost,
  photo,
  singlePost
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
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.get("/post/:postId", singlePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// Photo
router.get("/post/photo/:postId", photo);

router.param("postId", postById);

module.exports = router;