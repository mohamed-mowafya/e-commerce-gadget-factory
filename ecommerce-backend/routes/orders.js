const express = require("express");
const router = express.Router();


const { requireSignin,isAuth,isAdmin} = require('../controllers/auth');
const { userById, ajouterHistorique } = require("../controllers/user");
const { create, afficherCommandes, getValeursEtat,commandeParId,updateValeurEtat } = require("../controllers/orders");
const { soustraireQuantite } = require("../controllers/product");

router.get('/order/list/:userId',afficherCommandes, requireSignin,isAuth,isAdmin,)
router.get('/order/valeurs-etat/:userId',requireSignin,isAuth,isAdmin,getValeursEtat);
router.put('/order/:commandeId/etat/:userId',requireSignin,isAuth,isAdmin,updateValeurEtat);
router.post('/order/create/:userId',requireSignin,isAuth,ajouterHistorique,soustraireQuantite,create)

router.param("userId",userById)
router.param("commandeId",commandeParId);

module.exports = router;