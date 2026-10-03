const Farmer = require("../models/farmers");
const Purchase = require("../models/purchases");

const createPurchase = async(req, res) => {
    try {
        const { farmerId, item, category, quantity, unit, price } = req.body;

        if(!farmerId || !item || !category || quantity === undefined || unit === undefined || price === undefined ){
            return res.status(400).json({
                message: "All fields are required"
            });

        }
        if (quantity <= 0 || price < 0) {
            return res.status(400).json({
                message:
                    "Quantity must be greater than 0 and price cannot be negative"
            });
        }
        const existingFarmer = await Farmer.findOne({ farmerId })
        
        if(!existingFarmer){
            return res.status(404).json({
                message: "Farmer doesn't exist"
            });
        }

        
        const today = new Date();
        
        today.setHours(0, 0, 0, 0);


        // Calculate total amount on server
        const totalAmount = quantity * price;

        const purchase = await Purchase.create({
            farmer: existingFarmer._id,
            item,
            category,
            quantity,
            unit,
            price,
            totalAmount,
            date: today
        })


        return res.status(201).json({
            message: "Purchase recorded successfully",

            purchase: {
                id: purchase._id,
                farmerId: existingFarmer.farmerId,
                farmerName: existingFarmer.name,
                item: purchase.item,
                category: purchase.category,
                quantity: purchase.quantity,
                unit: purchase.unit,
                price: purchase.price,
                totalAmount: purchase.totalAmount,
                date: purchase.date
            }
        });
    } catch (error) {
        console.error(
            "Create Purchase Error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to record purchase"
        });
    }
}


module.exports = {
    createPurchase
};