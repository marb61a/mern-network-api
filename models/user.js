const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String
  },
  about: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: "subscriber"
  }
});

// UserSchema methods
userSchema.methods = {
  authenticate: function(plainText) {

  },
  encryptPassword: function(password) {
    if(!password) return "";

    try {

    } catch {
      return "";
    }
  }
}

module.exports = mongoose.model("User", userSchema);