/**
 * @Author :Himanshu Goyal
 * Batch upload of file 
 */

const chokidar = require('chokidar');
//File upload path from configuration file
const fileUploadPath = projectPath + "/public/"
const asynModule = require('async');
var Base = require("./mvc/services/BaseService");

var watcher = chokidar.watch(fileUploadPath, {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true
});

class BatchUpload extends Base {

    constructor() {
        super();
        /*
        The watcher will see the new file in given directory and fire the event according to that.
        */
        watcher.on('add', (path) => {
            Logger.info("New file get added", path)
            let fileName = path.split("/")[path.split("/").length - 1];
            let batchName = fileName.split(".")[0];
            asynModule.waterfall([
                (callback) => {
                    //Query For Check the User Batch Exist
                    this.checkBatchExist({ batchName }, callback);
                },
                (batchObj, callback) => {
                    if (!batchObj) {
                        //Save details of batch
                        this.saveDetails("UserBatch", { batchName }, callback);
                    } else {
                        callback("Batch already exist")
                    }
                },
                (batchObj, callback) => {
                    //Upload the batch file
                    this.uploadFile(path, batchObj, callback)
                }
            ], (err, result) => {
                if (err) {
                    Logger.info("Error in batch upload", err);
                } else {
                    Logger.info("File uploaded successfully");
                }
            })
        });
    }

    uploadFile(filePath, batchObj, callback) {
        let usersMap = new Map();
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filePath)
        });

        lineReader.on('line', (line) => {
            if (line) {
                let name = line.split(',')[1];
                let email = line.split(',')[2];
                let phone = line.split(',')[3];
                let imageUrl = line.split(',')[4];
                let title = line.split(',')[5];
                //Check value in Map
                if (!usersMap.has(email)) {
                    //If Map does't exist value
                    usersMap.set(email, { name: name, email: email, phone: phone, title: title, imageUrl: [imageUrl] });
                } else {
                    //If Map have value its means we are uploading another email
                    let mapObj = usersMap.get(email);
                    mapObj.imageUrl.push(imageUrl);
                    usersMap.set(email, mapObj);
                }
            }
        });

        lineReader.on('close', () => {
            Logger.info("File reads successfully");
            let userObjects = [];
            batchObj.noOfEntryInBatch = usersMap.size;
            for (let [key, value] of usersMap) {
                value.batch = batchObj;
                userObjects.push(new domain.Users(value));
            }
            //Batch Insert
            domain.Users.insertMany(userObjects, (err, mongooseDocuments) => {
                if (err) {
                    Logger.info("error in inserting the records");
                    this.updateBatchObject(batchObj._id, {
                        noOfEntryInBatch: usersMap.size,
                        batchStatus: "Failed",
                        error: err
                    }, (err1, result) => {
                        callback(err,null);
                    });
                } else {
                    this.updateBatchObject(batchObj._id, {
                        noOfEntryInBatch: usersMap.size,
                        batchStatus: "Submitted"
                    }, callback);
                }
            });
        })
    }

    updateBatchObject(_id, updateObject, callback) {
        domain.UserBatch.findOneAndUpdate({
            _id: _id
        }, {
                $set: updateObject
            }, { new: true }, (err, result) => {
                callback(err, result);
            });
    }

    /**
     * 
     * @param {*} searchObj {query object}
     * @param {*} callback  
     */
    checkBatchExist(searchObj, callback) {
        domain.UserBatch.findOne(searchObj, (err, result) => {
            callback(err, result);
        });
    }



};

new BatchUpload();
