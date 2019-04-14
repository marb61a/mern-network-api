const express = require("express");
const { 
  getPosts, 
  createPost,
  postsByUser,
  postById,
  isPoster,
  updatePost,
  deletePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment
} = require("../controllers/post");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);

// Like & Unlike
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

// Comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);

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

// If any route contains :userId, the app will first execute userById
router.param("userId", userById);

// If any route contains :postId, the app will first execute postById
router.param("postId", postById);

module.exports = router;