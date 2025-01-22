const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistedTokensModel = require('../models/blacklist.model');

// Helper function for standardized error handling
const errorResponse = (res, status, message) => {
    return res.status(status).json({ success: false, message });
};

// Signup Controller
module.exports.signup = async (req, res, next) => {
    try {
        const { email, password, username, role } = req.body;

        // Validate required fields
        if (!email || !password || !username) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'Email already exists',
            });
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await userModel({
            email,
            password: hashedPassword,
            username,
            role: role || 'user', // Default to 'user' if role is not provided
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ success: true, message: 'User created successfully', token });
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, 'Internal server error');
    }
};

// Signin Controller
module.exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return errorResponse(res, 401, 'Invalid credentials');
        }

        // Compare passwords securely
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ success: true, message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, 'Internal server error');
    }
};

// Logout Controller
module.exports.logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        // Validate token existence
        if (!token) {
            return res.status(400).json({
                message: "Token is required"
            });
        }

        // Check if the token is already blacklisted
        const isTokenBlacklisted = await blacklistedTokensModel.findOne({ token });
        if (isTokenBlacklisted) {
            return res.status(400).json({
                message: "Token is already blacklisted"
            });
        }

        // Blacklist the token
        await blacklistedToken.create({ token });

        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, 'Internal server error');
    }
};

module.exports.getProfile = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
       res.status(200).json({
        success: true,
        user
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, 500, 'Server error');
        }
};
