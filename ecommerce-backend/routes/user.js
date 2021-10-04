const express = require('express');
const router = express.Router();


const { userById} = require('../controllers/user');
const { requireSignin,isAdmin,isAuth} = require('../controllers/auth');


//TEST POUR isAuth + isAdmin
router.get('/secret/:userId', requireSignin,isAdmin,isAuth,(req, res) => {
    res.json({
        user: 'TEST MARCHE',
        user:req.profile
    });
});


router.param('userId', userById);

module.exports = router;