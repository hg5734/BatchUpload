/*
@Author Himanshu Goyal
Error View
*/

ErrorView = function() {};
ErrorView.prototype.render = function(req, res, result) {
  let error_code = result.error_code || "";
  let msg = result.msg || "";
  let data = result.data || {};
  if (error_code == "" && msg == "") {
    res.status(500);
    res.send({
      error: true,
      result: result,
      message: "Internal Server Error",
      timeStamp: new Date().getTime()
    });
  } else {
    res.status(error_code);
    res.send({
      error: true,
      result: data,
      message: msg,
      timeStamp: new Date().getTime()
    });
  }
};

module.exports = new ErrorView();
