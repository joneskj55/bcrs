/*=====================
; Title: Application Config
; Author: George Henderson
; Date: 17 September 2021
; Description: Configuration variables
;=====================*/

var config = {};
config.web = {};
config.web.port = process.env.PORT || '3000';
config.web.secret = 'extremelysupersecret';

module.exports = config;
