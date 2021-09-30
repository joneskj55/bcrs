/*
============================================
; Title:  line-item.js
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 30 Sep 2021
; Description: Line item schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number },
});

module.exports = lineItemSchema;
