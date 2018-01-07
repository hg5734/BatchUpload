@Author Himanshu Goyal

Requirements : 
Node v6 +
Mongodb
npm install
NODE_ENV=development node justclean.js

For Development
ServerURL : localhost:3000/

1.API Of List of Items

URL : ServerURL+api/v1/items
METHOD :GET
Optional Query parameter : limit,skip for Pagination

Response {
    "error": false,
    "result": [
        {
            "_id": "5a4749a13a9d4c247344e21e",
            "updatedAt": "2017-12-30T08:09:05.707Z",
            "createdAt": "2017-12-30T08:09:05.706Z",
            "__v": 0,
            "status": "Active",
            "price_currency": "RS",
            "item_price": 10,
            "item_name": "Item1"
        },
        {
            "_id": "5a4749a13a9d4c247344e21f",
            "updatedAt": "2017-12-30T08:09:05.707Z",
            "createdAt": "2017-12-30T08:09:05.707Z",
            "__v": 0,
            "status": "Active",
            "price_currency": "RS",
            "item_price": 20,
            "item_name": "Item2"
        },
        {
            "_id": "5a4749a13a9d4c247344e220",
            "updatedAt": "2017-12-30T08:09:05.707Z",
            "createdAt": "2017-12-30T08:09:05.707Z",
            "__v": 0,
            "status": "Active",
            "price_currency": "RS",
            "item_price": 30,
            "item_name": "Item3"
        }
    ],
    "timeStamp": 1514621828212,
    "statusCode": 200
}

2.API for Order Items 

URL : ServerURL+api/v1/order
METHOD :POST

Note : userId is for temperory when we using Auth security then we fetch the user details in middleware and token should be send in headers

Required parameter : userId,items
Request Body :{"userId":"userId1",
"items":[{
	"id":"5a47734eb85a7a57ac5aebb6",
	"quantity" :"1"
},{
	"id":"5a47734eb85a7a57ac5aebb7",
	"quantity" :"2"
},{
	"id":"5a47734eb85a7a57ac5aebb8",
	"quantity" :"3"
},{
	"id":"5a47734eb85a7a57ac5aebb9",
	"quantity" :"4"
},{
	"id":"5a47734eb85a7a57ac5aebba",
	"quantity" :"5"
}]
}
Response 
{
    "error": false,
    "result": [
        {
            "_id": "5a478536b13ce16ea851be32",
            "customerOrders": [
                {
                    "item_id": "5a47734eb85a7a57ac5aebb6",
                    "_id": "5a478536b13ce16ea851be37",
                    "price_currency": "RS",
                    "item_price": 10,
                    "item_name": "Item1",
                    "quantity": 1
                },
                {
                    "item_id": "5a47734eb85a7a57ac5aebb7",
                    "_id": "5a478536b13ce16ea851be36",
                    "price_currency": "RS",
                    "item_price": 20,
                    "item_name": "Item2",
                    "quantity": 2
                },
                {
                    "item_id": "5a47734eb85a7a57ac5aebb8",
                    "_id": "5a478536b13ce16ea851be35",
                    "price_currency": "RS",
                    "item_price": 30,
                    "item_name": "Item3",
                    "quantity": 3
                },
                {
                    "item_id": "5a47734eb85a7a57ac5aebb9",
                    "_id": "5a478536b13ce16ea851be34",
                    "price_currency": "RS",
                    "item_price": 40,
                    "item_name": "Item4",
                    "quantity": 4
                },
                {
                    "item_id": "5a47734eb85a7a57ac5aebba",
                    "_id": "5a478536b13ce16ea851be33",
                    "price_currency": "RS",
                    "item_price": 50,
                    "item_name": "Item5",
                    "quantity": 5
                }
            ],
            "totalPrice": 550,
            "totalItems": 15
        }
    ],
    "timeStamp": 1514636598216,
    "statusCode": 200
}








Common Response For Any Error
{
    "error": true,
    "result": {
    },
    "message": "Internal Server Error",
    "timeStamp": 1514621502699
}

{
    "error": true,
    "result": {},
    "message": "Please fill in all the mandatory field(s)!",
    "timeStamp": 1514628518261,
    "statusCode": 217
}
{
    "error": true,
    "result": null,
    "message": "No data found",
    "timeStamp": 1514636705986,
    "statusCode": 404
}