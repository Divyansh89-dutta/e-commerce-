const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post("/singup", userController.signup);
router.get("/login", userController.signin);
router.get("/logout", userController.logout);

module.exports = router;