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

/**
 * FindByID
 */

router.get('/:id', async(req, res)=> {
  try
  {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
      if(err)
      {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    })
  }
  catch(e)
  {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
})

/**
 * CreateSecurityQuestion
 */

router.post('/', async(req, res)=>{
  try
  {
    let newSecurityQuestion = {
      text: req.body.text
    };

    SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion){
      if (err)
      {
        console.log(err);
        const createSecurityQuestionMongodbErrorResponse =  new ErrorResponse(500, 'Internal Server Error', err);
        res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        const createSecurityQuestionResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
        res.json(createSecurityQuestionResponse.toObject());
      }
    })
  }
  catch(e)
  {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
})


module.exports = router;
