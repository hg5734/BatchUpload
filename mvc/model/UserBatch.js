/* 
 @Author Himanshu Goyal
 */
// Load required packages
var mongoose = require('mongoose');

var usersBatchSchema = new mongoose.Schema({
    batchName :{
        type :String,
        default :"",
        required : true,
        unique :true
    },
    noOfEntryInBatch :{
        type :Number,
        default:0
    },
    batchStatus:{
        type :String,
        enum :["Submitted","Uploading","Failed"],
        default:"Uploading"
    },//If any error comes during batch upload
    error :{
        type :Object,
        default:""
    }

}, {
    collection: 'usersBatch',
    strict: true,
    timestamps: true
});

// Export the Mongoose model
module.exports = mongoose.model('usersBatch', usersBatchSchema);