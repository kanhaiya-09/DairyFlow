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
    quantity: {
        type: Number,
        required: true,
        min: 0
        
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
    unit: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    totalAmount: {
        type: Number,
        required: true,
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