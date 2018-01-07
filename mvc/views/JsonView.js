/* @Author Himanshu Goyal 
Json view of application
*/
JsonView = function () {};
JsonView.prototype.render = function (req, res, result) {
    res.status(result.statusCode || 200);
    res.send({
        error: result.isError || false,
        result: result.object,
        message: result.message,
        timeStamp: new Date().getTime(),
        statusCode: result.statusCode
    });
};

module.exports = new JsonView;
