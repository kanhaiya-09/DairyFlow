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