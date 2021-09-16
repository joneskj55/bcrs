/**
 * Date: 15 September 2021
 * Title: security-questions-api.js
 * Author: Fred Marble
 * Modified:
 * Description: This is the security-questions-api for getting and receiving information on the users security questions.
 */

//Requires Statements
const express = require('express');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const SecurityQuestion = require('../models/security-question');

//Configuration Statements
const router = express.Router();

/**
 * findAll API
 */
router.get('/', async( req, res) =>{
  try
  {
    SecurityQuestion.find({})
    .where('isDisabled')
    .equals(false)
    .exec(function(err, securityQuestions)
    {
      if (err)
      {
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestions);
        const findAllResponse = new BaseResponse(200, 'Query Successful', securityQuestions);
        res.json(findAllResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});
