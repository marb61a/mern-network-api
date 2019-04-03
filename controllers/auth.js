const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");
const _ = require("lodash");
const { sendEmail } = require("../helpers");

exports.signup = async(req, res) => {
  const userExists = await User.findOne({
    email: req.body.email
  });
  if(userExists) {
    return res.status(403).json({
      error: "Email is already taken!"
    });
  }

  const user = await new User(req.body);
  await user.save();
  res.status(200).json({
    message: "Signup is successful! Please login."
  });
};

exports.signin = (req, res) => {
  // Find the user based on their email address
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    // If an error occurs or no user
    if(err || !user) {
      return res.status(401).json({
        error: "A User with that email does not exist. Please signup."
      });
    }

    // Ensure that user (if found) has matching email and password
    // The authentication method used here is created in the model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    // Generate a token using uer id and secret
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Persist the created token as t in the cookie and has an expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: { _id, email, name, role }
    });
  });
};