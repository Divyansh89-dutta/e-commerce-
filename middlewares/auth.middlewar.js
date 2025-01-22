const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const jwt = require("jsonwebtoken");
module.exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isBlacklisted = await blacklistModel.findOne({ token});
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted" });
        }
        if (!token) return res.status(401).json({ message: "Token is required" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        req.user = user;
        next();
        
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports.isSeller = async (req, res, next) =>{
    try{
        const user = req.user;
        if(!user.isSeller) return res.status(403).json({message: "Unauthorized"});
    }
    catch(error){
        res.status(500).json({message: "Server error"});
    }
}