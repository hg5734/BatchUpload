/* @Author Himanshu Goyal 
This file is url mapping and used we perform all routing in this application
 */
var multipartMiddleware = multipart();
module.exports = function (app) {
  var controllers = app.controllers,
    views = app.views,
    services = app.services;

  return {
    "/api/v1/items": [
      {
        action: controllers.perfumeController.listOfItems,
        method: "GET",
        middleware: [],
        views: {
          json: views.jsonView
        }
      }
    ],
    "/api/v1/order": [
      {
        action: controllers.perfumeController.orderItems,
        method: "POST",
        middleware: [],
        views: {
          json: views.jsonView
        }
      }
    ]

  };
};
