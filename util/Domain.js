/*
@Author :Himanshu Goyal
This file have all the domain model of application
*/
"use strict";

var domainModel = {};
domainModel.PerfumeItems = require("../mvc/model/PerfumeItems");
domainModel.OrderItems = require("../mvc/model/OrderItems");
domainModel.Users = require("../mvc/model/Users");
domainModel.UserBatch = require("../mvc/model/UserBatch");
module.exports = domainModel;
