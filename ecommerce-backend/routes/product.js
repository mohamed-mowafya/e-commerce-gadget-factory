const express = require("express");
const router = express.Router();


const {create, productById, read, remove} = require('../controllers/product');
const { requireSignin,isAdmin,isAuth} = require('../controllers/auth');
const { userById} = require('../controllers/user');

router.get('/product/:productId', read)
router.post("/product/create/:id",requireSignin, isAuth,isAdmin,create);
router.delete('/product/:productId/:id',requireSignin, isAuth,isAdmin, remove);

router.param('id', userById);
router.param('ProductId', productById);


module.exports = router;