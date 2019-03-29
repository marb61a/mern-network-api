const express = require("express");
const { getPosts, createPost } = require("../controllers/post");

const router = express.Router();

router.get("/posts", getPosts);

// Post routes
router.post();

module.exports = router;