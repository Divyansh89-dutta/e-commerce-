const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middlewar');
// Corrected routes
router.post("/signup", userController.signup);
router.post("/login", userController.signin); // Changed to POST for consistency
router.post("/logout", userController.logout);
router.get("/profile", authMiddleware.isAuthenticated, userController.getProfile);

module.exports = router;
