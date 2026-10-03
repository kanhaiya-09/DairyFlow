const mongoose = require("mongoose");

const milkCollectionSchema = new mongoose.Schema({
    farmer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer"
    },
    quantity : {
        type: Number,
        min: 0,
        required: true,
    },
    quality : {
        type: String,
        enum: ["good", "bad"],
        required: true
    },
    session: {
        type: String,
        enum: ["morning", "evening"],
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
},
    {
        timestamps: true
}
);

milkCollectionSchema.index(
    {
        farmer: 1,
        date: 1,
        session: 1
    },
    {
        unique: true
    }
);



const MilkCollection = mongoose.model(
    "MilkCollection", 
    milkCollectionSchema
);



module.exports = MilkCollection;