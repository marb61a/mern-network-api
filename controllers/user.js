const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .exec((err, user) => {
      if(err || !user) {
        return res.status(400).json({
          error: "User not found"
        });
      }

      req.profile = user;
      next();
    });
};

exports.hasAuthorization = (req, res, next) => {

};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if(err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(users);
  })
    .select("name email updated created role");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({

      });
    }
  });
};