/*
============================================
; Title:  role-api.js
; Author: Fred Marble
; Modified by: Kevin Jones
; Date: 30 Sep 2021
; Description: API for the curd operations for the Role.
;===========================================
*/

const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

const router = express.Router();

/**
 * FindAll
 */

router.get("/", async (req, res) => {
  try {
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal Server Error",
            err
          );
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(
            "200",
            "Query Successful",
            roles
          );
          res.json(findAllRolesResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/**
 * DeleteRole
 */
// delete role by id
router.delete("/:roleId", async (req, res) => {
  try {
    // Find the role by document id
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        // if error
        console.log(err); // log error
        // create error response
        const deleteRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        // send error response
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
      } else {
        // if no error
        // if role is found log it
        console.log(role);
        // Aggregate query to determine if the role being deleted is already mapped to an existing user
        User.aggregate(
          [
            {
              $lookup: {
                from: "roles",
                localField: "role.role",
                foreignField: "text",
                as: "userRoles",
              },
            },
            {
              $match: {
                "userRoles.text": role.text,
              },
            },
          ],
          // if the role is mapped to an existing user, return an error response
          function (err, users) {
            console.log(users); // log the users
            if (err) {
              // if error
              console.log(err); // log error
              // create error response
              const usersMongodbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              // send error response
              res.status(500).send(usersMongodbErrorResponse.toObject());
            } else {
              // If the query returns one or more users, then the role is already in user and shouldn't be disabled
              if (users.length > 0) {
                console.log(
                  `Role <${role.text}> is already in use and cannot be deleted`
                );
                // create error response
                const userRoleAlreadyInUseResponse = new BaseResponse(
                  400,
                  `Role '${role.text}' is in use.`,
                  role
                );
                // send error response
                res.status(400).send(userRoleAlreadyInUseResponse.toObject());
              } else {
                // Otherwise, the role requesting to be disabled is not in use and can be safely removed
                console.log(
                  `Role <${role.text}> is not an active role and can be safely removed`
                );
                role.set({
                  isDisabled: true,
                });
                // save the role
                role.save(function (err, updatedRole) {
                  if (err) {
                    console.log(err);
                    const updatedRoleMongodbErrorResponse = new ErrorResponse(
                      "500",
                      "Internal server error",
                      err
                    );
                    res
                      .status(500)
                      .send(updatedRoleMongodbErrorResponse.toObject());
                  } else {
                    console.log(updatedRole);
                    const roleDeletedResponse = new BaseResponse(
                      "200",
                      `Role '${role.text}' has been removed successfully`,
                      updatedRole
                    );
                    res.json(roleDeletedResponse.toObject());
                  }
                });
              }
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

// export the router
module.exports = router;
