/*
============================================
; Title:  roles.js
; Author: Fred Marble
; Date: 30 Sep 2021
; Description: Role Model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    text: {type: String, unique: true},
    isDisabled: {type: Boolean, default: false}
})

module.exports= mongoose.model('Role', roleSchema);