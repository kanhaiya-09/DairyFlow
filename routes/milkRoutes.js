
const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddlewares");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const { milkCollectionController, getMilkCollections } = require("../controllers/milkCollectionControllers");


router.post(
    "/",
    authenticate, 
    authorizeAdmin, 
    milkCollectionController
);
router.get("/", authenticate, authorizeAdmin, getMilkCollections)

module.exports = router;