/* @Author Himanshu Goyal */

var SetResponse = function () {}

SetResponse.prototype.setSuccess = function (message, object, statusCode, isError) {
    var response = {}
    response.message = message;
    response.object = object
    response.statusCode = statusCode || 200;
    response.isError = isError||false;
    return response;
}

SetResponse.prototype.setError = function (message, statusCode) {
    var error = new Error(message);
    error.status = statusCode;
    return error;
}

SetResponse.prototype.socketResponse = function (message, object, statusCode) {
    var response = {}
    response.message = message;
    response.object = object
    response.statusCode = statusCode || 200;
    response.timeStamp = new Date().getTime();
    return response;
}

module.exports = new SetResponse();
