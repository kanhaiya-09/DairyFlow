const Settlement = require("../models/settlements");

const {
    calculateSettlement
} = require("../services/settlementService");


const generateSettlement = async (req, res) => {
    try {

        const {
            farmerId,
            month,
            year
        } = req.body;


        if (
            !farmerId ||
            month === undefined ||
            year === undefined
        ) {
            return res.status(400).json({
                message:
                    "Farmer ID, month and year are required"
            });
        }


        if (month < 1 || month > 12) {
            return res.status(400).json({
                message:
                    "Month must be between 1 and 12"
            });
        }


        if (year < 2000) {
            return res.status(400).json({
                message: "Invalid year"
            });
        }


        const calculatedSettlement =
            await calculateSettlement(
                farmerId,
                month,
                year
            );


        const existingSettlement =
            await Settlement.findOne({
                farmer:
                    calculatedSettlement.farmer,

                month,
                year
            });


        if (existingSettlement) {
            return res.status(409).json({
                message:
                    "Settlement already exists for this farmer and month"
            });
        }


        const settlement =
            await Settlement.create({

                farmer:
                    calculatedSettlement.farmer,

                month:
                    calculatedSettlement.month,

                year:
                    calculatedSettlement.year,

                totalMilkQuantity:
                    calculatedSettlement.totalMilkQuantity,

                totalMilkAmount:
                    calculatedSettlement.totalMilkAmount,

                totalBadMilkDeduction:
                    calculatedSettlement.totalBadMilkDeduction,

                totalPurchaseAmount:
                    calculatedSettlement.totalPurchaseAmount,

                finalPayableAmount:
                    calculatedSettlement.finalPayableAmount
            });


        return res.status(201).json({

            message:
                "Settlement generated successfully",

            settlement: {

                id: settlement._id,

                farmerId:
                    calculatedSettlement.farmerId,

                farmerName:
                    calculatedSettlement.farmerName,

                month:
                    settlement.month,

                year:
                    settlement.year,

                totalMilkQuantity:
                    settlement.totalMilkQuantity,

                totalMilkAmount:
                    settlement.totalMilkAmount,

                totalBadMilkDeduction:
                    settlement.totalBadMilkDeduction,

                totalPurchaseAmount:
                    settlement.totalPurchaseAmount,

                finalPayableAmount:
                    settlement.finalPayableAmount,

                paymentStatus:
                    settlement.paymentStatus,

                paidAt:
                    settlement.paidAt
            }
        });

    } catch (error) {

        console.error(
            "Generate Settlement Error:",
            error.message
        );

        return res.status(500).json({
            message:
                "Failed to generate settlement"
        });
    }
};


module.exports = {
    generateSettlement
};