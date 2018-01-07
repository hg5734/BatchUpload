/*@Author Himanshu Goyal 
created basic mvc pattern 
*/
"use strict";
//Created Express Application
var express = require("express");
global.app = express();
var bodyParser = require("body-parser");
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
//Set the global project path
global.projectPath = __dirname;
var swaggerDocument = {}//require("./swagger.json");
// use body parser so we can get info from POST and/or URL parameters
app.use(
  bodyParser({
    limit: "50mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// parse application/json
app.use(bodyParser.json());
require("./util/Dependancy");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var Layers = require("layers").Express,
  wiring = require("./urlMapping");
new Layers(app, __dirname + "/mvc", wiring);

//Error response handler during validation on DTO
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500);
  res.send(err);
});
mongoose.Promise = global.Promise;
//Check error and success in mongodb
mongoose.connect(config.mongodb, {
  useMongoClient: true
});
// connect to database
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("openUri", function() {
  console.log("mongo db connection open");
});

var bootstrap = require("./util/Bootstrap").bootstrap();
var http = require("http").Server(app);

http.listen(config.port, function() {
  console.log("Example app listening on port" + config.port);
});

// swagger definition
var swaggerDefinition = {
  info: {
    title: "Just Clean API",
    version: "1.0.0",
    description: "Just Clean APIs"
  },
  host: "localhost:3000",
  basePath: "/"
};

// options for swagger jsdoc
var options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ["./urlMapping.js"] // path where API specification are written
};

// initialize swaggerJSDoc
var swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
