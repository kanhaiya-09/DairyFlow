const express = require("express");

const router = express.Router();

const authenticate =
    require("../middlewares/authMiddlewares");

const authorizeAdmin =
    require("../middlewares/authorizeAdmin");
    
const {
    createDairySettings
} = require("../controllers/dairySettingsControllers");


router.post(
    "/",
    authenticate,
    authorizeAdmin,
    createDairySettings
);


module.exports = router;