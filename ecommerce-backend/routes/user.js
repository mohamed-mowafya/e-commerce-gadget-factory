const express = require('express');
const router = express.Router();


const { userById, read , update,historiqueAchat} = require('../controllers/user');
const { requireSignin,isAdmin,isAuth} = require('../controllers/auth');


//TEST POUR isAuth + isAdmin
router.get('/secret/:userId', requireSignin,isAdmin,isAuth,(req, res) => {
    res.json({
        user: 'TEST MARCHE',
        user:req.profile
    });
});

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId',requireSignin,historiqueAchat)
router.param('userId', userById);

module.exports = router;