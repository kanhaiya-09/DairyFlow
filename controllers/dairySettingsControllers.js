const DairySettings = require("../models/dairySettings");

const createDairySettings = async (req,res) => {
    try {

        const { milkPricePerLiter, badMilkDeductionPerLiter } = req.body;

        if(milkPricePerLiter === undefined || badMilkDeductionPerLiter === undefined ){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(badMilkDeductionPerLiter >= milkPricePerLiter) {
            return res.status(400).json({
                message: "Deduction Rate cannot be higher than Per Liter Price."
            })
        }

        const settings = await DairySettings.create({
            milkPricePerLiter,
            badMilkDeductionPerLiter
        });

        return res.status(201).json({
            message: "Dairy settings created successfully",

            settings: {
                id: settings._id,
                milkPricePerLiter:
                    settings.milkPricePerLiter,
                badMilkDeductionPerLiter:
                    settings.badMilkDeductionPerLiter
            }
        });

    } catch (error) {
        console.error(
            "Create Dairy Settings Error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to create dairy settings"
        });
    }

}

module.exports = {
    createDairySettings
};