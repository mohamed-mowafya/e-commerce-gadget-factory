const express = require('express');
const router = express.Router();


const { userById} = require('../controllers/user');
const { requireSignin} = require('../controllers/auth');


//TEST POUR isAuth + isAdmin
router.get('/secret/:id', requireSignin,(req, res) => {
    res.json({
        user: 'TEST MARCHE',
        user:req.profile
    });
});


router.param('id', userById);

module.exports = router;