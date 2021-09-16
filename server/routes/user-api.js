/*
============================================
; Title:  user-api.js
; Author: Kevin Jones
; Date: 15 Aug 2021
; Description: User API routes
;===========================================
*/

// require statements
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");
const RoleSchema = require("../schemas/user-role");

const router = express.Router();
const saltRounds = 10; // default salt rounds for bcrypt hashing algorithm

// find all users
router.get("/", async (req, res) => {
  try {
    // get all users
    User.find({})
      .where("isDisabled")
      .equals(false) // only return users that are not disabled
      .exec(function (err, users) {
        // execute the query
        if (err) {
          // if there is an error
          console.log(err); // log the error
          // return an error response
          const findAllMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          // send the error response
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        } else {
          // if there is no error
          console.log(users); // log the users
          // return a success response
          const findAllUsersResponse = new BaseResponse(
            200,
            "Query successful",
            users
          );
          res.json(findAllUsersResponse.toObject()); // send the response
        }
      });
  } catch (e) {
    // if there is an error
    // return an error response
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    // send the error response
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});
