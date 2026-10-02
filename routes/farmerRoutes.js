const express = require("express");
const router = express.Router();
const { createFarmer } = require("../controllers/farmerControllers")

const authenticate = require("../middlewares/authMiddlewares");
const authorizeAdmin = require("../middlewares/authorizeAdmin");

router.post(
    "/", 
    authenticate, 
    authorizeAdmin, 
    createFarmer);

module.exports = router;