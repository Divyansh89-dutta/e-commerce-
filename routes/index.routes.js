const express = require('express');;
const router = express.Router();
const indexcontroller = require('../controllers/index.controller');

router.get('/', indexcontroller.index);

module.exports = router;