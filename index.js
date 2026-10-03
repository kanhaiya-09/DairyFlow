require("dotenv").config();

console.log("ENV TEST:", process.env.MONGODB_URI ? "FOUND" : "NOT FOUND");

const express = require("express");
const connectDB = require("./config/databaseConnection");
const cookieParser = require("cookie-Parser");
const app = express();

const PORT = process.env.PORT || 8000;

const farmerRoutes = require("./routes/farmerRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkRoutes");

connectDB();

app.use(cookieParser());

app.use(express.json());

app.use("/api/farmers", farmerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/milk-collections", milkRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Dairy Flow");
});

app.listen(PORT, () => {
    console.log(`The server has successfully connected to PORT ${PORT}`);
});