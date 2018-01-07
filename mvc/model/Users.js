/* 
 @Author Himanshu Goyal
 */
// Load required packages
var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        trim:true
    },
    email: {
        type: String,
        default: "",
        unique: true,
        trim:true
    },
    phone: {
        type: String,
        default: "",
        unique: true,
        trim:true
    },
    title: {
        type: String,
        default: "",
        trim:true
    },
    imageUrls: [{
        type: String,
        default: "",
        trim:true
    }],
    batch: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usersBatch",
        },
        batchName: {
            type: String,
            default: ""
        },
        noOfEntryInBatch: {
            type: Number,
            default: 0
        }
    }
}, {
        collection: 'users',
        strict: true,
        timestamps: true
    });

// Export the Mongoose model
module.exports = mongoose.model('users', usersSchema);