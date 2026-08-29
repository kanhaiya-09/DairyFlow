const express = require("express");
const router = express.Router();
const { createFarmer } = require("../controllers/farmerControllers")

router.post("/", createFarmer);

module.exports = router;