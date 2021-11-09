const express = require("express");
const router = express.Router();


const { requireSignin,isAuth} = require('../controllers/auth');
const { userById, ajouterHistorique } = require("../controllers/user");
const { create } = require("../controllers/orders");
const { soustraireQuantite } = require("../controllers/product");

router.post('/order/create/:userId',requireSignin,isAuth,ajouterHistorique,soustraireQuantite,create)


router.param("userId",userById)


module.exports = router;