/* 
 @Author Himanshu Goyal
 */
// Load required packages
var mongoose = require('mongoose');

var garageTimeslotSchema = new mongoose.Schema({
    garageId: {
        type: String,
        trim: true,
        default: ""
    },
    dayName: {
        type: String,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Undefined"
        ],
        default: "Undefined"
    },
    workingHour:{
        type :Number,
        default :0
    },
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Delete"]
    }
}, {
        collection: 'garageTimeslot',
        strict: true,
        timestamps: true
    });

// Export the Mongoose model
module.exports = mongoose.model('garageTimeslot', garageTimeslotSchema);