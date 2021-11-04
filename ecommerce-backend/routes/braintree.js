const express = require("express");
const router = express.Router();


const { requireSignin,isAuth} = require('../controllers/auth');
const { userById } = require("../controllers/user");
const { generateToken } = require("../controllers/braintree");


//Sera accessible a l'usagé authentifié seulement
router.get('/braintree/getToken/:userId', requireSignin,isAuth, generateToken);  //génère un token pour l'utilisateur

router.param('userId', userById);

module.exports = router;