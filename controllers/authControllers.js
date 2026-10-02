const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const login = async (req, res) => {
    try {
            const { phone, password } = req.body;

            if(!phone || !password){
            return res.status(400).json({
                message: "Mobile and Password are required"
            });
            }

            const user = await User.findOne({ phone });

            if(!user) {
                return res.status(401).json({
                    message:"invalid mobile or password"
                });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password, 
                user.password
            );

            if(!isPasswordCorrect){
                return res.status(401).json({
                    message: "Invalid mobile or password"
                });
            }

            const token = jwt.sign(
                {
                userId: user._id,
                role: user.role
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "1d"
                }
            );

            //Store JWT in HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: true,
            })

            return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                phone: user.phone,
                role: user.role
            }
            });

        } catch (error) {
            console.error("Login Error:", error.message);

            return res.status(500).json({
                message: "Login failed"
            });
        
    }
};

module.exports = {
    login
}
