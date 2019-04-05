const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name role")
    .select("_id title body created likes")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err
        });
      }
      
      req.post = post;
      next();
    });
};

// With pagination
exports.getPosts = async(req, res) => {
  // Gets the page from req.query or use the default of 1
  const currentPage = req.query.page || 1;

  // Returns 3 posts per page
  const perPage = 6;
  let totalItems;

  const posts = await Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .populate("comments", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .select("_id title body created likes")
        .limit(perPage)
        .sort({ created: -1 });
    })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => console.log(err));
}

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    let post = new Post();
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    if(files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: err
        });
      }

      res.json(result);
    });
  });
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .select("_id title body created likes")
    .sort("_created")
    .exec((err, posts) => {
      if(err) {
        return res.status(400).json({
          error: err
        });
      }

      res.json(posts);
    });
};