const express = require("express");
const router = express.Router();


const {create} = require('../controllers/product');
const { requireSignin,isAdmin,isAuth} = require('../controllers/auth');
const { userById} = require('../controllers/user');

router.post(
    "/product/create/:id",
    requireSignin, 
    isAuth,
    isAdmin,
    create
);


router.param('id', userById);

module.exports = router;