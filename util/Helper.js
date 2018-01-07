/*
@Author Himanshu Goyal
*/
var winston = require("winston");
const nodemailer = require("nodemailer");

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: true
    }),
    new winston.transports.File({
      filename: "seedInfo.log",
      json: true
    })
  ],
  exitOnError: false
});

exports.logger = logger;
/**
 * 
 * @param {*} res 
 * @param {*} result 
 * @param {*} message 
 * @param {*} statusCode 
 * @param {*} isError 
 */
var commonResponseHandler = function(
  res,
  result,
  message,
  statusCode,
  isError
) {
  var date = new Date();
  res.status(statusCode);
  res.send({
    error: isError,
    result: result,
    message: message,
    timeStamp: date.getTime(),
    statusCode: statusCode
  });
};
exports.commonResponseHandler = commonResponseHandler;
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} paramsArray 
 */
var validateRequestBody = function(req, res, paramsArray) {
  //Lower case the email id
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  var status = true;
  for (var i = 0; i < paramsArray.length; i++) {
    if (!req.body[paramsArray[i]] || req.body[paramsArray[i]] === "") {
      console.log("Missing param");
      commonResponseHandler(
        res,
        {},
        ApplicationMessage.missing_params_msg,
        ApplicationMessage.missing_params_code,
        true
      );
      status = false;
      break;
    }
  }
  return status;
};

var transporter = nodemailer.createTransport({
  service: config.emailProvider,
  auth: {
    user: config.emailFrom,
    pass: config.emailPassword
  }
});

exports.sendTextEmail = function(fromEmail, toEmail, subject, emailBody) {
  Logger.info("Control in send text email");
  transporter.sendMail({
    from: fromEmail || config.emailFrom,
    to: toEmail,
    subject: subject,
    text: emailBody
  });
};

exports.sendHtmlEmail = function(fromEmail, toEmail, subject, emailBody) {
  Logger.info("Control in send html email");
  transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: subject,
    html: emailBody
  });
};

exports.validateRequestBody = validateRequestBody;
