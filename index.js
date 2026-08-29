require("dotenv").config();

console.log("ENV TEST:", process.env.MONGODB_URI ? "FOUND" : "NOT FOUND");

const express = require("express");
const connectDB = require("./config/databaseConnection");

const app = express();

const PORT = process.env.PORT || 8000;

const farmerRoutes = require("./routes/farmerRoutes");

connectDB();

app.use(express.json());

app.get("/api/farmers", farmerRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Dairy Flow");
});

app.listen(PORT, () => {
    console.log(`The server has successfully connected to PORT ${PORT}`);
});