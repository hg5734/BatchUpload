/*
@Author Himanshu Goyal
This file used to perform operation in starting of application
*/

exports.bootstrap = function () {
    console.log("Control in bootstrap")
    //addPerfumeItems();
}

/**
 * For Add the dummy items in data base from CSV file 
 */
function addPerfumeItems() {
    var items = [];
    domain.PerfumeItems.count({}, function (err, total) {
        Logger.info("Total  items", total)
        if (!total) {
            var lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(projectPath + '/public/perfumeitem.csv')
            });
            lineReader.on('line', function (line) {
                //console.log(line)
                if (line) {
                    items.push(new domain.PerfumeItems({
                        item_name: line.split(',')[1],
                        item_price: line.split(',')[2],
                    }));
                }
            });
            lineReader.on('close', function () {
                Logger.info("total number of items need to insert" + items.length);
                domain.PerfumeItems.insertMany(items, function (err, mongooseDocuments) {
                    /* Your callback function... */
                    if (err) {
                        Logger.info("error in save the master items")
                    } else {
                        Logger.info("Success to save the master items" + mongooseDocuments)
                    }
                });
                Logger.info("End");
            });
        }
    });
}
