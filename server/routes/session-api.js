/*===============================
; Title: Session API
; Date: 17 September 2021
; Author: George Henderson
; Description: API for session routes.
===============================*/

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

const router = express.Router();
const config = require('../../config');



/**
 * authenticate user
 */
 router.post('/signin', async (req, res) => {
  try {
    User.findOne({userName: req.body.userName}, (err, user) => {
      // Error
      if (err) {
        console.log(err);

        const authenticateError = new ErrorResponse(500, "Internal Server Error", err);
        return res.status(500).send(authenticateError.toObject());
      }
      // Successful
      else {
        // No user found - 404
        if (!user) {
          const noUserError = new ErrorResponse(404, "No user found", null);
          return res.status(404).send(noUserError.toObject());
        }
        console.log('--User--');
        console.log(user);
        console.log('--req.body.password--')
        console.log(req.body.password);
        console.log('--user.password--');
        console.log(user.password);

        const isAuthenticated = bcrypt.compareSync(req.body.password, user.password);

        // Password is invalid - 401
        if (!isAuthenticated) {
          const invalidPasswordResponse = new BaseResponse(401, "Invalid Password", null);

          return res.status(401).send(invalidPasswordResponse.toObject());
        }
        // Password matches user
        else {
          // Sign Token
          var token = jwt.sign({ session_user: req.params.userName }, config.web.secret, {
            expiresIn: "24h"
          });

          const logInSuccessful = new BaseResponse(200, "Login Successful", { auth: true, userName: user.userName, token: token });
          return res.status(200).send(logInSuccessful.toObject());
        }
      }
    })
  }
  catch(e) {
    console.log(e);

    const authenticateCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    return res.status(500).send(authenticateCatchErrorResponse.toObject());
  }
})

module.exports = router;
