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
const UserRoleSchema = require("../schemas/user-role");
const SelectedSecurityQuestionSchema = require("../schemas/selected-security-question");

// Define the user schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    state: { type: String },
    zipCode: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
