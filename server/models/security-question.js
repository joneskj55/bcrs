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

const securityQuestions = new Schema({
  question:{type: String},
  answer: {type: String}
})

module.exports = mongoose.model("Security Questions", securityQuestions);
