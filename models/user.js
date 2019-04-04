const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
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
  following: [{
    type: ObjectId,
    ref: "User" 
  }],
  followers: [{
    type: ObjectId,
    ref: "User"
  }],
  resetPassword: {
    data: String,
    default: ""
  },
  role: {
    type: String,
    default: "subscriber"
  }
});

/* 
  Virtual fields which exist only logically and are not persisted in the
  database and are not written to a document collection
*/ 
userSchema
  .virtual(password)
  .set(function() {
    // Create a temporary variable
    this._password = password;

    // Generate a timestamp
    this.salt = uuidv1();

    // Encrypt the password()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// UserSchema methods
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if(!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch {
      return "";
    }
  }
}

module.exports = mongoose.model("User", userSchema);