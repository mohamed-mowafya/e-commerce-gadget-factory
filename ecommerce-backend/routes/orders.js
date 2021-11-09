const express = require("express");
const router = express.Router();


const { requireSignin,isAuth,isAdmin} = require('../controllers/auth');
const { userById, ajouterHistorique } = require("../controllers/user");
const { create, afficherCommandes } = require("../controllers/orders");
const { soustraireQuantite } = require("../controllers/product");

router.post('/order/create/:userId',requireSignin,isAuth,ajouterHistorique,soustraireQuantite,create)

router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,afficherCommandes)

router.param("userId",userById)


module.exports = router;