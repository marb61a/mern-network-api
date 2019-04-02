const express = require("express");
const { 
  getPosts, 
  createPost ,
  postById
} = require("../controllers/post");

const router = express.Router();

router.get("/posts", getPosts);

// Post routes
router.post(createPost);
router.param("postId", postById);

module.exports = router;