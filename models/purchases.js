const mongoose = require("mongoose");
const Farmer = require("./farmers");

const purchaseSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Farmer
    },
    item: {
        type: String,
        required: true,
        trim: true
    },
    
    category: {
        type: String,
        enum: [
            "feed",
            "medicine",
            "grocery",
            "other"
        ],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    totalAmount: {
        type: Number,
        min: 0,
    },
    date: {
        type: Date,
        required: true
    },

},
{
    timestamps: true
})



const Purchase = mongoose.model(
    "Purchase",
    purchaseSchema
);

module.exports = Purchase;