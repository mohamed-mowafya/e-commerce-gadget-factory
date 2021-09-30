const User = require('../Models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require("jsonwebtoken"); // generer un token 
const expressJwt = require('express-jwt'); // valider l'autorisation du signin


exports.signup =  (req, res) => {



    const user = new User(req.body);

    user.save((err,user) => {


        if(err) {

            return res.status(400).json({
                err:errorHandler(err)
            });
        }


        user.hashed_password = undefined;
        user.salt = undefined;


        res.json({
            user
        });





    });

};




exports.signin =  (req, res) => {


    // chercher l.utilisateur avec email:

    const {email,password} = req.body
     User.findOne({email} , (err,user) => {


            if(err || !user) {


                return res.status(400).json ({

                    err:"Mauvais utilisateur ."
                });
            }

            // si utilisateur existe :


            if(!user.authenticate(password)) {
                return res.status(401).json(
                    {
                        error : "Email ou le mot de passe sont incorrectes !"
                    }
                );
            }

            const token = jwt.sign({_id:user._id} , process.env.JWT_SECRET)
            res.cookie('t',token,{expire: new Date()+ 9999})
            const {_id,name,email,role}=user
            return res.json({token,user:{_id,email,name,role}})

    });





};


