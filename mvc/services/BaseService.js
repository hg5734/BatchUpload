/*
@Author Himanshu Goyal
Common Service
*/
var bcrypt = require('bcrypt-nodejs');

class BaseService {

    constructor() {
    }

    generateEncrptPassword(password, callback) {
        bcrypt.genSalt(5, function (err, salt) {
            if (err) return callback(err, null);
            bcrypt.hash(password, salt, null, function (err, hash) {
                callback(err, hash);
            });
        });
    }

    findAndUpdateRecord(domainName, condition, updateObject, callback) {
        domain[domainName].findOneAndUpdate(condition, {
            $set: updateObject
        }, {
                new: true,
                runValidators: true
            }).exec((err, result) => {
                callback(err, result);
            });
    }

    checkDataExist(domainName, condition, callback) {
        domain[domainName].findOne(condition).exec((err, result) => {
            callback(err, result);
        });
    }

    aggregate(domainName, searchObject, callback) {
        domain[domainName].aggregate(searchObject, function (err, object) {
            callback(err, object);
        });
    }

    createdProjectionObject(objectArray, value) {
        var projectionObject = {};
        for (var i = 0; i < objectArray.length; i++) {
            projectionObject[objectArray[i]] = value
        }
        return projectionObject;
    }

    saveDetails(domainName, object, callback) {
        var obj = new domain[domainName](object);
        obj.save((err, result) => {
            callback(err, result);
        });
    }

    noDataFound(callback) {
        callback(null, ResponseHandler.setSuccess(ApplicationMessage.no_data_found_msg, null, ApplicationMessage.no_data_found, true))
    }

    findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] == value) {
                return i;
            }
        }
        return -1;
    }

}

module.exports = BaseService;
