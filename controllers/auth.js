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

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});

exports.forgotPassword = (req, res) => {
  if(!req.body) {
    return res.status(400).json({
      message: "No request body"
    });
  }

  if(!req.body.email) {
    return res.status(400).json({
      message: "There is no email in the request body"
    });
  }

  console.log("Forgotten password, finding the user whose email matches");
  const { email } = req.body;
  console.log("signin req.body", email);

  // Find the user by email
  User.findOne({ email }, (err, user) => {
    if(err || !user) {
      return res.status("401").json({
        error: "The user matching that email does not exist!"
      });
    }

    // Generate a token with userId and secret
    const token = jwt.sign(
      { _id: user._id, iss: "NODEAPI" },
      process.env.JWT_SECRET
    );

    // Email Data
    const emailData = {
      from: "",
      to: email,
      subject: "Instructions for resetting password",
      text: `Please use the following link to reset your password: ${
        process.env.CLIENT_URL
      }/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> 
      <p>${ process.env.CLIENT_URL }/reset-password/${token}</p>`
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if(err) {
        return res.json({ message: err });
      } else {
        sendEmail(emailData);
        return res.status(200).json({
          message: `Email has been sent to ${email}. 
          Follow the instructions to reset your password.`
        });
      }
    });
  });

};