/*
@Author Himanshu Goyal
This application contains all dependancy of application
*/

global.asyncModule = require('async');
global.mongoose = require('mongoose');



//Project Dependancy
global.config = require('./Config').config();
global.ResponseHandler = require("./ResponseHandler");
global.domain = require('./Domain')
global.ApplicationMessage = require('./ApplicationMessage')
global.Logger = require('./Helper').logger
global.HelperModule = require('./Helper')
global.multipart = require('connect-multiparty')



//Included the batch upload file
require("../batchUpload")