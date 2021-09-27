/**
 * Title: selected-security-question.js
 * Author: Richard Krasso
 * Modified: Fred Marble
 * Date: 16 September 2021
 * Description: This is the schema for the selected security questions.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Mapping the selected security questions so that if one is deleted, and a user has it selected, they will still be able to use the question.
let selectedSecurityQuestionSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String },
});

module.exports = selectedSecurityQuestionSchema;
