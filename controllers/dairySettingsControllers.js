const DairySettings = require("../models/dairySettings");

const createDairySettings = async (req, res) => {
    try {
        const {
            milkPricePerLiter,
            badMilkDeductionPerLiter
        } = req.body;

        if (
            milkPricePerLiter === undefined ||
            badMilkDeductionPerLiter === undefined
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (
            milkPricePerLiter < 0 ||
            badMilkDeductionPerLiter < 0
        ) {
            return res.status(400).json({
                message: "Rates cannot be negative"
            });
        }

        if (
            badMilkDeductionPerLiter >
            milkPricePerLiter
        ) {
            return res.status(400).json({
                message:
                    "Deduction rate cannot be higher than milk price"
            });
        }

        const settings = await DairySettings.create({
            milkPricePerLiter,
            badMilkDeductionPerLiter,
            effectiveFrom: new Date()
        });

        return res.status(201).json({
            message: "Dairy settings created successfully",

            settings: {
                id: settings._id,
                milkPricePerLiter:
                    settings.milkPricePerLiter,
                badMilkDeductionPerLiter:
                    settings.badMilkDeductionPerLiter,
                effectiveFrom:
                    settings.effectiveFrom,
                effectiveTo:
                    settings.effectiveTo
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
};

const getDairySettings = async (req, res) => {
    try {
        const settings = await DairySettings.findOne({
            isActive: true
        });

        if (!settings) {
            return res.status(404).json({
                message: "Dairy settings not configured"
            });
        }

        return res.status(200).json({
            message: "Dairy settings fetched successfully",

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
            "Get Dairy Settings Error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to fetch dairy settings"
        });
    }
};


const updateDairySettings = async (req, res) => {
    try {
        const {
            milkPricePerLiter,
            badMilkDeductionPerLiter
        } = req.body;

        if (
            milkPricePerLiter === undefined ||
            badMilkDeductionPerLiter === undefined
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (
            milkPricePerLiter < 0 ||
            badMilkDeductionPerLiter < 0
        ) {
            return res.status(400).json({
                message: "Rates cannot be negative"
            });
        }

        if (
            badMilkDeductionPerLiter >
            milkPricePerLiter
        ) {
            return res.status(400).json({
                message:
                    "Deduction rate cannot be higher than milk price"
            });
        }

        const currentSettings =
            await DairySettings.findOne({
                effectiveTo: null
            }).sort({
                effectiveFrom: -1
            });

        const effectiveFrom = new Date();

        // Close current rate
        if (currentSettings) {
            currentSettings.effectiveTo =
                effectiveFrom;

            await currentSettings.save();
        }

        // Create new rate
        const newSettings = await DairySettings.create({
            milkPricePerLiter,
            badMilkDeductionPerLiter,
            effectiveFrom,
            effectiveTo: null
        });

        return res.status(200).json({
            message:
                "Dairy settings updated successfully",

            settings: {
                id: newSettings._id,
                milkPricePerLiter:
                    newSettings.milkPricePerLiter,
                badMilkDeductionPerLiter:
                    newSettings.badMilkDeductionPerLiter,
                effectiveFrom:
                    newSettings.effectiveFrom,
                effectiveTo:
                    newSettings.effectiveTo
            }
        });

    } catch (error) {
        console.error(
            "Update Dairy Settings Error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to update dairy settings"
        });
    }
};


module.exports = {
    createDairySettings,
    getDairySettings,
    updateDairySettings
};