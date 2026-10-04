const express = require("express");

const router = express.Router();

const authenticate =
    require("../middlewares/authMiddlewares");

const authorizeAdmin =
    require("../middlewares/authorizeAdmin");

const {
    createDairySettings,
    getDairySettings,
    updateDairySettings
} = require("../controllers/dairySettingsControllers");


router.post(
    "/",
    authenticate,
    authorizeAdmin,
    createDairySettings
);


router.get(
    "/",
    authenticate,
    authorizeAdmin,
    getDairySettings
);


router.put(
    "/",
    authenticate,
    authorizeAdmin,
    updateDairySettings
);


module.exports = router;