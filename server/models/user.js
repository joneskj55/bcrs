/*
============================================
; Title:  user.js
; Author: Kevin Jones
; Date: 15 Sep 2021
; Description: User model
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  address: { type: String },
  state: { type: String },
  zip: { type: String },
  // role: will add later
  // securityQuestions: will add later
});

module.exports = mongoose.model("User", userSchema);
