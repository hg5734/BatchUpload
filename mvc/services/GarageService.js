/* 
@Author Himanshu Goyal
*/
//For Inheritance 
var Base = require("./BaseService")
var ObjectId = require("mongoose").Types.ObjectId;
var asyncModule = require('async');

class GarageService extends Base {

    constructor() {
        super()
    }

    

}

module.exports = new GarageService();