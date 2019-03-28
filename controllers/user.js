const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    
  })
}