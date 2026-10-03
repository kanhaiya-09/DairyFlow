/* console.log("CREATE ADMIN SCRIPT STARTED");
require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/users");

const createAdmin = async () => {
    try {
        console.log("Starting admin creation...");
        console.log(
            "MONGODB_URI:",
            process.env.MONGODB_URI ? "FOUND" : "NOT FOUND"
        );
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");

        const adminPhone = "1234567890";
        const adminPassword = "Admin@123";

        const existingAdmin = await User.findOne({ phone : adminPhone });

        if(existingAdmin){
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            adminPassword,
            10
        );

        const admin = await User.create({
            phone: adminPhone,
            password: hashedPassword,
            role: "admin",
        });


        console.log("Admin successfully Created.");
        console.log("Phone:", admin.phone);
        console.log("Password", adminPassword);

        process.exit(0);


    } catch (error) {
    console.error(
        "Admin Creation Failed.",
        error.message
    )
    };
} */




console.log("1. Script started");

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/users");

const createAdmin = async () => {
    try {
        console.log("2. Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("3. MongoDB Connected");

        const adminPhone = "9999999999";
        const adminPassword = "Admin@123";

        // Check whether admin already exists
        const existingAdmin = await User.findOne({
            phone: adminPhone
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            await mongoose.connection.close();
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            adminPassword,
            10
        );

        // Create admin
        const admin = await User.create({
            phone: adminPhone,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully.");
        console.log("Phone:", admin.phone);
        console.log("Password:", adminPassword);
        console.log("Role:", admin.role);

        await mongoose.connection.close();

        console.log("MongoDB connection closed.");

    } catch (error) {
        console.error("Admin creation failed:");
        console.error(error);

        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    }
};

createAdmin();