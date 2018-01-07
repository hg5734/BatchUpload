
/*
@Author Himanshu Goyal

Perfume Controller
We are an online perfume reseller.
In our DB, we are starting to store a list of items and their prices.
We need 2 APIs:
 An item listing Api to display all the items in the db.
 An order api with will take the selected items with their quantities and on
successfully saving the order to the db, show a response with the list of items,
quantities and price and the total number of items and total amount.
*/
class PerfumeController {


  /**
   * API of List of items
   * @param {*} req 
   * @param {*} res 
   * @param {*} callback 
   */
  listOfItems(req, res, callback) {

    Logger.info("Control in the list of items")
    this.services.perfumeService.listOfPefumeItems(req, callback);

  }

  /**
   * API of order items
   * @param {*} req 
   * @param {*} res 
   * @param {*} callback 
   */
  orderItems(req, res, callback) {

    Logger.info("Control in the order items");
    var status = HelperModule.validateRequestBody(req, res, ["userId", "items"]);
    if (status) {
      this.services.perfumeService.orderItems(req, callback)
    }

  }



}

module.exports = function () {
  return new PerfumeController();
}