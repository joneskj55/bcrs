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
const Question = require('./security-question');
const Answer = require('./security-question')

//Defining the Security Question Schema

const securityQuestions = new Schema({
  question:[Question],
  answer: Answer
})

module.exports = mongoose.model("Security Questions", securityQuestions);
