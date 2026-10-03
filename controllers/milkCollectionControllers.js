const Farmer = require("../models/farmers");
const MilkCollection = require("../models/milkCollections");
const milkCollectionController = async (req,res) => {
    try {
        const { farmerId, quantity, quality, session } = req.body;


        if(!farmerId || quantity === undefined || !quality || !session){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingFarmer = await Farmer.findOne({ farmerId })

        if(!existingFarmer){
            return res.status(404).json({
                message: "Farmer doesn't exist"
            });
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const collection = await MilkCollection.create({
            farmer: existingFarmer._id,
            quantity,
            quality,
            session,
            date: today
        })

        return res.status(201).json({
            message: "Milk collection recorded successfully",
        
            collection: {
                id: collection._id,
                farmerId: existingFarmer.farmerId,
                farmerName: existingFarmer.name,
                quantity: collection.quantity,
                quality: collection.quality,
                session: collection.session,
                date: collection.date
            }
        
        });
    } catch (error) {


        // Duplicate collection
        if (error.code === 11000) {
            return res.status(409).json({
                message:
                    "Milk collection already recorded for this farmer and session today"
            });
        }

        console.error("Milk Collection Error:", error.message)

        return res.status(500).json({
            message: "Failed to add milk collection data"
        });
    }
}




// Get all milk collections:

const getMilkCollections = async (req, res) => {
    try{
        const collections = await MilkCollection
        .find()
        .populate("farmer", "farmerId name phone")
        .sort({ date:-1 });

        return res.status(200).json({
            message: "Milk collections fetched successfully",
            collections
        });
    } catch (error) {
        console.error(
            "Get Milk Collections Error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to fetch milk collections"
        });
    }
    
}





module.exports = {
    milkCollectionController,
    getMilkCollections
};
