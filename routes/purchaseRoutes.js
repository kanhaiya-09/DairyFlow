const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/authMiddlewares");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const { createPurchase } = require("../controllers/recordPurchases")

router.post("/", authenticate, authorizeAdmin, createPurchase);

module.exports = router;