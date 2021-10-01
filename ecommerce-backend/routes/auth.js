const express = require("express");
const router = express.Router();


const {signup,signin,signout,requireSignin} = require('../controllers/auth');
const {userSignupValidator}= require ('../validator');

router.post("/signup",userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout)


//route pour le test , on va la commenter apres reussir le test

router.get("/Bonjour", requireSignin, (req,res) => {
    res.send("Hello c un TEST page shooping normal");
});




    module.exports = router;