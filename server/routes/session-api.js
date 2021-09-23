/*===============================
; Title: Session API
; Date: 17 September 2021
; Author: George Henderson
; Modified by: Kevin Jones
; Description: API for session routes.
===============================*/

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

const router = express.Router();
const config = require("../../config");

/**
 * POST Sign In
 * Attempts to sign the user in given 'userName' & 'password' in req.body
 * Sends the proper error messages back to the client
 */
router.post("/signin", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      // Server error
      if (err) {
        console.log(err);

        // Send 500 Response: 'Internal Server Error'
        const authenticateError = new ErrorResponse(
          500,
          "Internal Server Error",
          err
        );
        return res.status(500).send(authenticateError.toObject());
      }
      // Query went through
      else {
        // No user found - 404
        if (!user) {
          const noUserError = new ErrorResponse(
            404,
            "This user was not found",
            null
          );
          return res.status(404).send(noUserError.toObject());
        }

        const isAuthenticated = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        // Password is invalid
        if (!isAuthenticated) {
          const invalidPasswordResponse = new BaseResponse(
            401,
            "Invalid Password",
            null
          );

          // Send 401 response & BaseResponse: 'Invalid Password'
          return res.status(401).send(invalidPasswordResponse.toObject());
        }
        // Password matches user
        else {
          // Sign jsonwebtoken
          var token = jwt.sign(
            { session_user: req.params.userName },
            config.web.secret,
            {
              expiresIn: "24h",
            }
          );

          // Send 200 response & BaseResponse: 'Login Successful'
          const logInSuccessful = new BaseResponse(200, "Login Successful", {
            auth: true,
            userName: user.userName,
            token: token,
          });
          return res.status(200).send(logInSuccessful.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);

    // Send 500 response & ErrorResponse: 'Internal Server Error'
    const authenticateCatchErrorResponse = new ErrorResponse(
      500,
      "Internal Server Error",
      e.message
    );
    return res.status(500).send(authenticateCatchErrorResponse.toObject());
  }
});

/**
 * verifySecurityQuestions
 */
router.post("/verify/users/:userName/security-questions", async (req, res) => {
  // Get user from database
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      // Server error
      if (err) {
        console.log(err); // Log error to console
        // Send 500 response & ErrorResponse: 'Internal Server Error'
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal sever error",
          err
        );
        res
          .status(500)
          .send(verifySecurityQuestionsMongodbErrorResponse.toObject());
        // Query went through
      } else {
        console.log(user); // Log user to console

        // check answers to security questions
        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(
          (q) => q.questionText === req.body.questionText1
        );
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(
          (q2) => q2.questionText === req.body.questionText2
        );
        const selectedSecurityQuestionThree =
          user.selectedSecurityQuestions.find(
            (q3) => q3.questionText === req.body.questionText3
          );

        // check if answers match
        const isValidAnswerOne =
          selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo =
          selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree =
          selectedSecurityQuestionThree.answerText === req.body.answerText3;

        // if all answers match
        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.console.log(
            `User ${user.userName} answered their security questions correctly`
          );
          // send base response with 200 status
          const validSecurityQuestionsResponse = new BaseResponse(
            "200",
            "success",
            user
          );
          res.json(validSecurityQuestionsResponse.toObject());
          // if answers do not match
        } else {
          // log message to console
          console.console.log(
            `User ${user.userName} did not answer their security questions correctly`
          );
          // send base response with 200 status
          const invalidSecurityQuestionsResponse = new BaseResponse(
            "200",
            "error",
            user
          );
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    });
    // catch error
  } catch (e) {
    console.console.log(e); // log error to console
    // send 500 response & ErrorResponse: 'Internal Server Error'
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

module.exports = router;
