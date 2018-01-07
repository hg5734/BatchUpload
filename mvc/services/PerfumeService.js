/* 
@Author Himanshu Goyal
*/
//For Inheritance 
var Base = require("./BaseService")
var ObjectId = require("mongoose").Types.ObjectId;
var asyncModule = require('async');

class PerfumeService extends Base {
    constructor() {
        super()
    }

    /**
     *@param req Request object having limit,skip as optionals parameters
      @param callback Response callback
     */
    listOfPefumeItems(req, callback) {
        let limit = req.query.limit
        let skip = req.query.skip
        let searchObj = [{
            $match: {
                status: "Active"
            }
        }];
        if (skip) {
            searchObj.push({
                $skip: parseInt(skip)
            })
        }
        if (limit) {
            searchObj.push({
                $limit: parseInt(limit)
            })
        }
        this.aggregate("PerfumeItems", searchObj, (err, result) => {
            callback(err, ResponseHandler.setSuccess(ApplicationMessage.items_list_msg, result, ApplicationMessage.success_code, false))
        });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} callback 
     */
    orderItems(req, callback) {
        const reqBody = req.body;
        const reqItems = reqBody.items;
        if (reqItems.length) {
            let items = this.getItemsId(reqItems);
            asyncModule.waterfall([(cb) => {
                //Fetch the perfume items from Db
                this.fetchPerfumeItems(items, cb)
            }, (itemsObject, cb) => {
                Logger.info(itemsObject.length, "Items length", items.length)
                //Store the order in database
                if (itemsObject && itemsObject.length) {
                    let orderItems = this.saveOrderDetails(reqBody, itemsObject, reqItems);
                    this.saveDetails("OrderItems", orderItems, cb)
                } else {
                    this.noDataFound(callback);
                }
            }, (orderItems, cb) => {
                //For cal of final result
                this.finalResultOfPlaceOrder(orderItems, cb)
            }], (err, result) => {
                callback(err, ResponseHandler.setSuccess(ApplicationMessage.activites_list_msg, result, ApplicationMessage.success_code, false))
            });
        } else {
            this.noDataFound(callback);
        }
    }

    /**
     * 
     * @param {*} reqBody 
     * @param {*} itemsObject 
     * @param {*} items 
     */
    saveOrderDetails(reqBody, itemsObject, items) {
        let customerOrders = [];
        itemsObject.forEach((item) => {
            let index = this.findObjectByKey(items, "id", item._id)
            //let index = items.indexOf(new ObjectId(item._id));
            Logger.info(item._id, "INDEX", index)
            if (index != -1) {
                customerOrders.push({
                    item_price: item.item_price,
                    item_id: item._id,
                    price_currency: item.price_currency,
                    item_name: item.item_name,
                    quantity: parseInt(items[index].quantity)
                });
            }
        });
        let orderItems = new domain.OrderItems({
            user_id: reqBody.userId,
            customerOrders: customerOrders
        });
        return orderItems;
    }


    /**
     * 
     * @param {*} orderItems 
     * @param {*} cb 
     * Result calculation from database for total items and total price and fetched the items from database
     */
    finalResultOfPlaceOrder(orderItems, cb) {
        let aggregateObj = []
        aggregateObj.push({
            $match: {
                _id: orderItems._id
            }
        });

        //For calculation of total items and total price
        aggregateObj.push({
            $project: {
                "_id": 1,
                "userId": 1,
                "customerOrders": 1,
                "totalPrice": {
                    "$sum": {
                        "$map": {
                            "input": "$customerOrders",
                            "as": "row",
                            "in": {
                                "$multiply": [
                                    { "$ifNull": ["$$row.quantity", 0] },
                                    { "$ifNull": ["$$row.item_price", 0] }
                                ]
                            }
                        }
                    }
                },
                "totalItems": {
                    "$sum": {
                        "$map": {
                            "input": "$customerOrders",
                            "as": "row",
                            "in": "$$row.quantity"
                        }
                    }
                }
            }
        });
        this.aggregate("OrderItems", aggregateObj, cb)
    }

    /**
     * 
     * @param {*} ids 
     * @param {*} callback 
     * Fetch perfume items For order items
     */
    fetchPerfumeItems(ids, callback) {
        let searchObj = {
            $match: {
                _id: {
                    $in: ids
                },
                status: "Active"
            }
        }
        this.aggregate("PerfumeItems", searchObj, callback)
    }

    /**
     * 
     * @param {*} itemsObject 
     * Fetch Items from Array of object For search Iteams from database
     */
    getItemsId(itemsObject) {
        let items = [];
        itemsObject.forEach((item) => {
            if (item.id && item.id.length == 24) {
                items.push(new ObjectId(item.id));
            }
        });
        return items;
    }


}

module.exports = new PerfumeService();