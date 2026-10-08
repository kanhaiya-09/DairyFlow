const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer",
            required: true
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        year: {
            type: Number,
            required: true
        },

        totalMilkQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        totalMilkAmount: {
            type: Number,
            required: true,
            min: 0
        },

        totalBadMilkDeduction: {
            type: Number,
            required: true,
            min: 0
        },

        totalPurchaseAmount: {
            type: Number,
            required: true,
            min: 0
        },

        finalPayableAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending"
        },

        paidAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


settlementSchema.index(
    {
        farmer: 1,
        month: 1,
        year: 1
    },
    {
        unique: true
    }
);

const Settlement = mongoose.model(
    "Settlement",
    settlementSchema
);

module.exports = Settlement;