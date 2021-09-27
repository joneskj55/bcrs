/*
============================================
; Title:  security-question.js
; Author: Fred Marble
; Date: 15 Sep 2021
; Description: Security Question Model
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining the Security Question Schema

const securityQuestionSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "securityQuestions" }
);

module.exports = mongoose.model("SecurityQuestion", securityQuestionSchema);
