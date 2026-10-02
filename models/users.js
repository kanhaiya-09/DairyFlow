const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "farmer"],
    },
    active: {
        type: Boolean,
        default: true,

    } 
    
})

const User = mongoose.model("User", userSchema);

module.exports = User;