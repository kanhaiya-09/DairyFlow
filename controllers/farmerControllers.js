const bcrypt = require("bcrypt");
const User = require("../models/users");
const Farmer = require("../models/farmers");

const createFarmer = async (req, res) => {
    try {
        const { farmerId, name, phone, address } = req.body;
        
        // Basic validation
        if(!farmerId || name || phonne ){
            return res.status(400).json({
                message: "Farmer Id, name and phone are must."
            });
        }

        // Check if Farmer Id already exists
        const existingFarmer = await Farmer.findOne({ farmerId });
        if(existingFarmer){
            return res.status(409).json(
                {
                    message: "Farmer ID already exists."
                });
        }
        // Check if phone already exists.
        existingFarmer = await Farmer.findOne({ phone });
        if(existingFarmer){
            return res.status(409).json(
                {
                    message: "Phone already exists."
                });
        }

        const temporaryPassword = `${farmerId}@2026`;
        const hashedPassword = await bcrypt.hash(
            temporaryPassword,
            10
        )
        const user = await User.create({
            phone,
            password: hashedPassword,
            role: "farmer"
        })

        const farmer = await Farmer.create({
            farmerId,
            name,
            phone,
            address,
            user: user._id
        })
        
        return res.status(201).json({
            message: "Farmer created successfully",
            farmer: {
                id: farmer._id,
                farmerId: farmer.famerId,
                name: farmer.name,
                phone: farmer.phone,
            },
            temporaryPassword
        });

    } catch (error) {
        console.error("Create Farmer Error:", error.message)

        return res.status(500).json({
            message: "Failed to create farmer"
        });
    }
    
}

module.exports = { createFarmer }