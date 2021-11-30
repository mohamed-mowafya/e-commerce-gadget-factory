const express = require("express");
const router = express.Router();

const {
  userById,
  listAllUsers,
  read,
  update,
  historiqueAchat,
} = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

//TEST POUR isAuth + isAdmin
router.get("/secret/:userId", requireSignin, isAdmin, isAuth, (req, res) => {
  res.json({
    user: "TEST MARCHE",
    user: req.profile,
  });
});
router.get("/users", listAllUsers);
router.get("/user/:userId", read); //requireSignin, isAuth
router.get("/orders/by/user/:userId", historiqueAchat);//requireSignin
router.put("/user/:userId", update);//requireSignin, isAuth

router.param("userId", userById);

module.exports = router;
