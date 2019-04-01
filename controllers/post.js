const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {

};

exports.getPosts = async(req, res) => {

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