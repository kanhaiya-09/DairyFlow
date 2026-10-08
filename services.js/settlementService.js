const Farmer = require("../models/farmers");
const MilkCollection = require("../models/milkCollections");
const Purchase = require("../models/purchases");
const DairySettings = require("../models/dairySettings");
const Settlement = require("../models/settlements");

const Farmer = require("../models/farmers");
const MilkCollection = require("../models/milkCollections");
const Purchase = require("../models/purchases");
const DairySettings = require("../models/dairySettings");

const calculateSettlement = async (
    farmerId,
    month,
    year
) => {

    const farmer = await Farmer.findOne({
        farmerId
    });

    if (!farmer) {
        throw new Error("Farmer doesn't exist");
    }

    const startDate = new Date(
        year,
        month - 1,
        1
    );

    const endDate = new Date(
        year,
        month,
        1
    );

    const collections = await MilkCollection.find({
        farmer: farmer._id,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    }).sort({
        date: 1
    });

    const purchases = await Purchase.find({
        farmer: farmer._id,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    });

    let totalMilkQuantity = 0;
    let totalMilkAmount = 0;
    let totalBadMilkDeduction = 0;
    let totalPurchaseAmount = 0;

    for (const collection of collections) {

        totalMilkQuantity += collection.quantity;

        const settings =
            await DairySettings.findOne({
                effectiveFrom: {
                    $lte: collection.date
                },
                $or: [
                    {
                        effectiveTo: null
                    },
                    {
                        effectiveTo: {
                            $gt: collection.date
                        }
                    }
                ]
            }).sort({
                effectiveFrom: -1
            });

        if (!settings) {
            throw new Error(
                `No dairy settings found for collection date ${collection.date}`
            );
        }

        const milkAmount =
            collection.quantity *
            settings.milkPricePerLiter;

        totalMilkAmount += milkAmount;

        if (collection.quality === "bad") {

            const deduction =
                collection.quantity *
                settings.badMilkDeductionPerLiter;

            totalBadMilkDeduction += deduction;
        }
    }

    for (const purchase of purchases) {
        totalPurchaseAmount +=
            purchase.totalAmount;
    }

    const finalPayableAmount =
        totalMilkAmount
        - totalBadMilkDeduction
        - totalPurchaseAmount;

    return {
        farmer: farmer._id,
        farmerId: farmer.farmerId,
        farmerName: farmer.name,

        month,
        year,

        totalMilkQuantity,
        totalMilkAmount,
        totalBadMilkDeduction,
        totalPurchaseAmount,
        finalPayableAmount
    };
};

module.exports = {
    calculateSettlement
};