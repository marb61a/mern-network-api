const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .exec((err, user) => {

    });
}

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
}