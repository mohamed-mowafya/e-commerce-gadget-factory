const express = require("express");
const router = express.Router();



const {signup} = require('../controllers/user');
const {userSignupValidator}= require ('../validator');

router.post("/signup",signup)

    module.exports = router;