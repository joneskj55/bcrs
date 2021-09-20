/*
============================================
; Title:  user-role.js
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 20 Sep 2021
; Description: User role schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the user role schema
let userRoleSchema = new Schema({
  role: { type: String, default: "standard" },
});

module.exports = userRoleSchema;
