const mongoose = require("mongoose");

const dairySettingsSchema = new mongoose.Schema(
    {
        milkPricePerLiter: {
            type: Number,
            required: true,
            min: 0
        },

        badMilkDeductionPerLiter: {
            type: Number,
            required: true,
            min: 0
        },


        effectiveFrom: {
            type: Date,
            required: true
        },

        effectiveTo: {
            type: Date,
            default: null
        }
    },


    {
        timestamps: true
    }
);

const DairySettings = mongoose.model(
    "DairySettings",
    dairySettingsSchema
);

module.exports = DairySettings;