const express = require("express");
const router = express.Router();


const { requireSignin,isAuth} = require('../controllers/auth');
const { userById } = require("../controllers/user");
const { generateToken } = require("../controllers/braintree");


//Sera accessible a l'usagé authentifié seulement


module.exports = router;