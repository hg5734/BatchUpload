/*@Author Himanshu Goyal
Configuration of different Enviornment Like Development,Staging,Live
*/

var config = function () {
  var conf = {};
  //If we set envoirement variable
  switch (process.env.NODE_ENV) {
    case "development":
      conf.mongodb = "mongodb://localhost:27017/justclean";
      conf.port = 3000;
      config.fileupload = projectPath+"/public";
      break;
    case "staging":
      conf.mongodb = "mongodb://localhost:27017/justclean";
      conf.port = 4000;
      config.fileupload = projectPath+"/public";
      break;
    case "live":
      conf.mongodb = "mongodb://localhost:27017/justclean";
      conf.port = 4000;
      break;
  }
  return conf;
};

module.exports.config = config;
