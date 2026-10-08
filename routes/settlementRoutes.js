const express = require("express");

const router = express.Router();

const authenticate =
    require("../middlewares/authMiddlewares");

const authorizeAdmin =
    require("../middlewares/authorizeAdmin");

const {
    generateSettlement
} = require("../controllers/settlementControllers");


router.post(
    "/",
    authenticate,
    authorizeAdmin,
    generateSettlement
);


module.exports = router;