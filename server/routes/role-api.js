/*
============================================
; Title:  role-api.js
; Author: Fred Marble
; Date: 30 Sep 2021
; Description: API for the curd operations for the Role.
;===========================================
*/

const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router;

/**
 * FindAll
 */

router.get('/', async (req, res)=> {
    try
    {
        Role.find({})
            .where('isDisabled')
            .equals(false)
            .exec(function(err, roles)
            {
                if(err)
                {
                    console.log(err);
                    const findAllRolesMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                    res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
                }
                else
                {
                    console.log(roles);
                    const findAllRolesResponse = new BaseResponse('200', 'Query Successful', roles);
                    res.json(findAllRolesResponse.toObject());
                }
            })
    }
    catch (e)
    {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
        res.status(500).send(findAllRolesCatchErrorResponse.toObject());
    }
})
