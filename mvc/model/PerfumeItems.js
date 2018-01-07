/* 
 @Author Himanshu Goyal
 */
// Load required packages
var mongoose = require('mongoose');

var perfumeItemsSchema = new mongoose.Schema({
    item_name: {
        type: String,
        trim: true,
        default: ""
    },
    item_price: {
        type: Number,
        default: 0
    },
    price_currency: {
        type: String,
        trim: true,
        default: "RS",
        enum: ["RS"]
    },
    status: {
        type: String,
        default: "Active",
        enum:["Active","Delete"]
    },
    description :{
        type :String,
        default :""
    }
}, {
        collection: 'perfumeItems',
        strict: true,
        timestamps: true
});

// Export the Mongoose model
module.exports = mongoose.model('PerfumeItems', perfumeItemsSchema);