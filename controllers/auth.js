const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");
const _ = require("lodash");

exports.signup = async(req, res) => {
  console.log("hello");
}