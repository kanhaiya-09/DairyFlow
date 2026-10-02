const jwt = require("jsonwebtoken")
const { authenticate } = require("./authMiddlewares")

const authorize = (req, res, next) => {
    
    const role = req.user.role;
    if(role!="admin"){
        return res.status(403).json({
            message: "You are not authorized for this work"
        })
    }
    next();


}
module.exports = authorize;