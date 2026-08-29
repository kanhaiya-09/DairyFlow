const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    farmerId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    active: {
        type: Boolean,
        default: true,
    },
},{timestamps: true}
,)


const Farmer = mongoose.model("Farmer, farmerSchema");

module.exports = Farmer;
