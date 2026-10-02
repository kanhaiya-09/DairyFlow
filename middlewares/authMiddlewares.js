const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "Authentication Required"
            });
        }

        const decoded = jwt.verify(
            token, 
            process.env.SECRET_KEY
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        })
    }
}

module.exports = authenticate;