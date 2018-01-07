/* 
 @Author Himanshu Goyal
 */
// Load required packages
var mongoose = require('mongoose');

var orderitemsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        trim: true,
        default: ""
    },
    customerOrders: [{
        item_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "perfumeItems",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
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
    }],
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Delete"]
    }
}, {
        collection: 'orderitems',
        strict: true,
        timestamps: true
    });

// Export the Mongoose model
module.exports = mongoose.model('orderitems', orderitemsSchema);