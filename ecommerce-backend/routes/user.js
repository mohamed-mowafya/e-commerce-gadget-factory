const express = require("express");
const router = express.Router();


const {bonjour} = require('../controllers/user');

router.get('/', bonjour)

    module.exports = router;